import { RotaResponse, SingleRotaResponse } from "@/models/scheduling";
import { addDays, isAfter } from "date-fns";

export type TransformedRota = {
  employeeId: string;
  employee: SingleRotaResponse["employee"];
  rotas: (SingleRotaResponse | null)[];
};

export type TransformedRotaResponse = {
  start_date: string;
  end_date: string;
  data: TransformedRota[];
};

export const transformRotaByEmployee = (
  response: RotaResponse,
): TransformedRotaResponse => {
  const { start_date, end_date, data: rotaList } = response.data;

  // 1️⃣ Generate full date range
  const dates: string[] = [];
  let current = new Date(start_date);
  const end = new Date(end_date);

  while (!isAfter(current, end)) {
    dates.push(current.toISOString().split("T")[0]);
    current = addDays(current, 1);
  }

  // 2️⃣ Group rotas by employee
  const employeeMap = new Map<
    string,
    {
      employee: SingleRotaResponse["employee"];
      rotasByDate: Record<string, SingleRotaResponse>;
    }
  >();

  for (const rota of rotaList) {
    if (!employeeMap.has(rota.employee_id)) {
      employeeMap.set(rota.employee_id, {
        employee: rota.employee,
        rotasByDate: {},
      });
    }

    employeeMap.get(rota.employee_id)!.rotasByDate[rota.date] = rota;
  }

  // 3️⃣ Build final transformed structure
  const transformed: TransformedRota[] = [];

  employeeMap.forEach((value, employeeId) => {
    const rotas = dates.map((date) => value.rotasByDate[date] ?? null);

    transformed.push({
      employeeId,
      employee: value.employee,
      rotas,
    });
  });

  return {
    start_date,
    end_date,
    data: transformed,
  };
};
