import { Prisma } from "../generated/prisma/client.js";
import type { Coupon } from "../generated/prisma/client.js";

export interface CouponsRepository {
  create(data: Prisma.CouponCreateInput): Promise<Coupon>;
  update(id: string, data: Prisma.CouponUpdateInput): Promise<Coupon>;
  delete(id: string): Promise<Coupon | null>;
  findById(id: string): Promise<Coupon | null>;
  searchMany(page: number): Promise<Coupon[]>;
  count(): Promise<Coupon | null>;
}