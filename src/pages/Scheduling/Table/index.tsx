import { useGetSchedulingListQuery } from "@/services/scheduling";
import { formatScheduleDate } from "./utils";
import RotaTable from "../components/RotaTable";
import Button from "@/components/ui/button";
import { LeftArrowIcon } from "@/assets/icons/LeftArrowIcon";
import { RightArrowIcon } from "@/assets/icons/RightArrowIcon";
import Dropdown from "@/components/ui/dropdown";
import { Option } from "@/components/ui/dropdown/types";
import { ScheduleFrequency } from "@/models/Requests/schedule";
import { useState } from "react";
import FormSkeleton from "@/components/common/Skeleton";
import RotaModal from "../components/modals";
import { getTodayFormatted, shiftDate } from "@/lib/date-helpers";
import {
  TransformedRotaResponse,
  transformRotaByEmployee,
} from "./rota-helper";

export default function Scheduling() {
  const getScheduleFrequencyOptions = (): Option<ScheduleFrequency>[] => {
    return [
      { label: "Month", value: "monthly" },
      { label: "Week", value: "weekly" },
    ];
  };

  const [frequency, setFrequency] = useState<ScheduleFrequency>(
    getScheduleFrequencyOptions()[0].value,
  );
  const [isOpen, setIsOpen] = useState(false);

  const [startingDate, setStartingDate] = useState<string>(getTodayFormatted());

  const { data, isLoading, isFetching, isError } = useGetSchedulingListQuery({
    frequency,
    date: startingDate,
  });

  if (!data) return;

  const schedulingPeriodStartedAt = data?.data?.start_date;

  const transformedScheduling: TransformedRotaResponse =
    transformRotaByEmployee(data);

  return (
    <div>
      <h1 className="section-title mb-6">Schedule Planner</h1>

      {isFetching ? (
        <FormSkeleton itemCount={1} columns={2} containerClassname="mb-6" />
      ) : (
        <div className="flex flex-wrap gap-3 lg:gap-6 justify-between items-center mb-6">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 items-center">
            <div className="flex gap-3 lg:gap-6 items-center">
              <Button
                className="lg:bg-[#CFE6F1] lg:border-[1.5px] lg:border-[#C0C8CC] size-8 lg:size-12 lg:rounded-xl"
                title="Previous"
                onClick={() => {
                  const validDate = startingDate ?? schedulingPeriodStartedAt;
                  const shiftedDate = shiftDate({
                    dateString: validDate,
                    unit: frequency,
                    amount: -1,
                  });
                  setStartingDate(shiftedDate);
                }}
              >
                <LeftArrowIcon className="size-4 lg:size-auto" />
              </Button>

              <p className="text-base lg:text-lg 2xl:text-xl leading-none font-bold">
                {formatScheduleDate(startingDate ?? schedulingPeriodStartedAt)}
              </p>

              <Button
                className="lg:bg-[#CFE6F1] lg:border-[1.5px] lg:border-[#C0C8CC] size-8 lg:size-12 lg:rounded-xl"
                title="Next"
                onClick={() => {
                  const validDate = startingDate ?? schedulingPeriodStartedAt;
                  const shiftedDate = shiftDate({
                    dateString: validDate,
                    unit: frequency,
                    amount: 1,
                  });
                  setStartingDate(shiftedDate);
                }}
              >
                <RightArrowIcon className="size-4 lg:size-auto" />
              </Button>
            </div>

            <Dropdown
              containerClassname="!w-40"
              value={[frequency]}
              options={getScheduleFrequencyOptions()}
              onChange={(values) => {
                const currentValue = values[0];
                if (currentValue !== frequency) {
                  setFrequency(currentValue);
                }
              }}
            />
          </div>

          <div>
            <Button variant="primary" onClick={() => setIsOpen(true)}>
              + New Shift
            </Button>

            {isOpen && <RotaModal isOpen={isOpen} setIsOpen={setIsOpen} />}
          </div>
        </div>
      )}

      <div>
        <RotaTable
          // showSerial
          // columns={columns}

          frequency={frequency}
          data={transformedScheduling}
          border={{
            table: false,
            rows: true,
            columns: true,
          }}
          striped={true}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          // onColumnClick={(data) => {
          //   console.log("data1111111111: ", data);
          // }}
          // pagination={{
          //   // limit: currentPageNo * (data?.data?.users?.per_page ?? 1),
          //   limit: data?.data?.users?.per_page ?? 1,
          //   offset: currentPageNo * (data?.data?.users?.per_page ?? 1),
          //   currentPage: currentPageNo,
          //   onPageChange: (page) => {
          //     setCurrentPageNo(page);
          //   },
          //   total: data?.data?.users?.total ?? 0,
          // }}
        />
      </div>
    </div>
  );
}
