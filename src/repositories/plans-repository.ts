import type { Plan } from "../generated/prisma/client.js";

export type CreatePlanData = {
  name: string
  price: number
  duration: number
}

export type UpdatePlanData = {
  name?: string
  price?: number
  duration?: number
}

export interface PlansRepository {
  create(data: CreatePlanData): Promise<Plan>;
  update(id: string, data: UpdatePlanData): Promise<Plan>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Plan | null>;
  searchMany(page: number): Promise<Plan[]>;
  count(): Promise<number>
}
