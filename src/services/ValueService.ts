import { IFinances, IGetFinances } from "../interfaces/values";
import { api } from "./api";

export default class ValueService {
  private path: string;
  constructor() {
    this.path = "/financials";
  }

  public get(): Promise<IGetFinances[]> {
    return api.get(this.path).then((response) => response.data);
  }

  public valueRegister(data): Promise<IFinances> {
    return api.post(this.path, data);
  }

  public delete(id: number): Promise<any> {
    return api.delete(`${this.path}/${id}`);
  }
}
