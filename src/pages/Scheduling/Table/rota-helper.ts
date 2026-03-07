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
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export const transformRotaByEmployee = (
  response: RotaResponse,
): TransformedRotaResponse => {
  const { start_date, end_date, data } = response.data;

  const rotaList = data?.data;

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
    console.log("rota: ", rota);
    if (!employeeMap.has(String(rota?.employee?.id))) {
      employeeMap.set(String(rota.employee.id), {
        employee: rota.employee,
        rotasByDate: {},
      });
    }

    employeeMap.get(String(rota.employee.id))!.rotasByDate[rota.date] = rota;
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
    current_page: data.current_page,
    last_page: data.last_page,
    per_page: data.per_page,
    total: data.total,
  };
};
