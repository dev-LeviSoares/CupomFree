import { prisma } from "../../lib/prisma.js";
import type { PlansRepository, CreatePlanData, UpdatePlanData } from "../plans-repository.js";

export class PrismaPlansRepository implements PlansRepository {
  async create (data: CreatePlanData) {
    const plan = await prisma.plan.create({
      data: {
        name: data.name,
        price: data.price,
        duration: data.duration
      }
    })

    return plan;
  }

  async update(id: string, data: UpdatePlanData) {
    const plan = await prisma.plan.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.duration !== undefined && { duration: data.duration }),
      }
    })

    return plan
  }

  async delete(id: string) {
    await prisma.plan.delete({
      where: { id }
    })
  }

  async count() {
    const plansCount = await prisma.plan.count();

    return plansCount
  }

  async searchMany(page: number) {
    const plans = await prisma.plan.findMany({
      take: 20,
      skip: (page - 1) * 20,
      orderBy: { created_at: 'asc' },
    })

    return plans
  }

  async findById(id: string) {
    const plan = await prisma.plan.findUnique({
      where: {
        id
      }
    })

    return plan;
  }
}