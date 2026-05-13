import path from "path";
import fs from "fs/promises";
import type { Order } from "../types";

const DB_PATH = path.join(process.cwd(), "db", "data.json");

class OrderService {
  private async readData(): Promise<Order[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async writeData(data: Order[]) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  async get(): Promise<Order[]> {
    const data = await this.readData();
    return data;
  }

  async getById(id: string): Promise<Order | null> {
    const data = await this.readData();
    return data.find((order) => order.id === id) || null;
  }

  async create(order: Omit<Order, "id">) {
    const data = await this.readData();
    const newOrder = {
      id: String(Math.floor(Math.random() * 100)),
      ...order,
    };
    data.push(newOrder);
    await this.writeData(data);
  }

  async update(id: string, updates: Partial<Omit<Order, "id">>) {
    const data = await this.readData();
    const i = data.findIndex((order) => order.id === id);
    if (i === -1) {
      return null;
    }
    data[i] = { ...data[i], ...updates } as Order;
    await this.writeData(data);
    return data[i];
  }
  async delete(id: string) {
    const data = await this.readData();
    const i = data.findIndex((order) => order.id === id);
    if (i === -1) {
      return null;
    }
    data.splice(i, 1);
    await this.writeData(data);
    return true;
  }
}
export const orderService = new OrderService();
