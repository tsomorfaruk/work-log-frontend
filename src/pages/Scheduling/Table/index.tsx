import { useGetSchedulingListQuery } from "@/services/scheduling";
import { formatScheduleDate, transformSchedulingResponse } from "./utils";
import { TransformedSchedulingResponse } from "@/models/scheduling";
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

export default function Scheduling() {
  const getScheduleFrequencyOptions = (): Option<ScheduleFrequency>[] => {
    return [
      { label: "Month", value: "month" },
      { label: "Week", value: "week" },
    ];
  };

  const [frequency, setFrequency] = useState<ScheduleFrequency>(
    getScheduleFrequencyOptions()[0].value,
  );
  const [isOpen, setIsOpen] = useState(false);
  console.log("isOpen: ", isOpen);

  const { data, isLoading, isFetching, isError } = useGetSchedulingListQuery({
    frequency,
  });

  if (!data) return;

  const schedulingPeriodStartedAt =
    frequency === "month"
      ? (data?.data as { month: any })?.month?.start_date
      : (data?.data as { week: any })?.week?.start_date;
  console.log("schedulingPeriodStartedAt: ", schedulingPeriodStartedAt);

  const transformedScheduling: TransformedSchedulingResponse =
    transformSchedulingResponse(data);

  return (
    <div>
      <h1 className="section-title mb-6">Schedule Planner</h1>

      {isFetching ? (
        <FormSkeleton itemCount={1} columns={2} containerClassname="mb-6" />
      ) : (
        <div className="flex gap-6 justify-between items-center">
          <div className="flex gap-6 items-center mb-6">
            <Button
              className="bg-[#CFE6F1] border-[1.5px] border-[#C0C8CC] size-12 rounded-xl"
              title="Previous"
            >
              <LeftArrowIcon />
            </Button>

            <p className="text-lg 2xl:text-xl leading-none font-bold">
              {formatScheduleDate(schedulingPeriodStartedAt)}
            </p>

            <Button
              className="bg-[#CFE6F1] border-[1.5px] border-[#C0C8CC] size-12 rounded-xl"
              title="Next"
            >
              <RightArrowIcon />
            </Button>

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
