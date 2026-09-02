import { randomUUID } from "node:crypto";
import { Prisma, type Plan } from "../../generated/prisma/client.js";
import type { CreatePlanData, PlansRepository, UpdatePlanData } from "../plans-repository.js";

export class InMemoryPlanRepository implements PlansRepository {
  public items: Plan[] = []
  
  async create (data: CreatePlanData) {
    const plan = {
      id: randomUUID(),
      name: data.name,
      price: new Prisma.Decimal(data.price),
      duration: data.duration,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(plan);

    return plan;
  }

  async update(id: string, data: UpdatePlanData) {
    const plan = this.items.find((item) => item.id === id)
  
    if (!plan) {
      throw new Error('Plan not found') // ou o mesmo comportamento que você definir no contrato
    }
  
    if (data.name !== undefined) plan.name = data.name
    if (data.price !== undefined) plan.price = new Prisma.Decimal(data.price)
    if (data.duration !== undefined) plan.duration = data.duration
    plan.updated_at = new Date()
  
    return plan
  }

  async delete(id: string) {
    const index = this.items.findIndex((item) => item.id === id);

    if(index === -1) {
      throw new Error('Plan not found')
    }
    
    this.items.splice(index, 1);
  }

  async count() {
    const countPlans =  this.items.length

    return countPlans
  }

  async searchMany(page: number) {
    const plans = this.items
      .slice()
      .sort((a, b) => a.created_at.getTime() - b.created_at.getTime())
  
    return plans.slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    const plan = this.items.find((item) => item.id === id);

    if(!plan) {
      return null
    }

    return plan
  }
}