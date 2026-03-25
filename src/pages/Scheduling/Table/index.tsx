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
import CustomDatePicker from "@/components/common/CustomDatePicker";
import moment from "moment";
import {
  TransformedRotaResponse,
  transformRotaByEmployee,
} from "./rota-helper";
import {
  // useGetBranchListQuery,
  useGetDepartmentListQuery,
} from "@/services/shared";
import { useGetFloorListQuery } from "@/services/floor";
import FloorDepartmentFilter from "./components/FloorDepartmentFilter";
import { ReloadIcon } from "@/assets/icons";

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
  const [currentPageNo, setCurrentPageNo] = useState(1);

  // const [branchId, setBranchId] = useState<number | string>();
  const [departmentId, setDepartmentId] = useState<number | string>();
  const [floorId, setFloorId] = useState<number | string>();

  // const { data: branchData } = useGetBranchListQuery();
  const { data: floorData } = useGetFloorListQuery({});
  const { data: departmentData } = useGetDepartmentListQuery();

  const { data, isLoading, isFetching, isError, refetch } =
    useGetSchedulingListQuery({
      frequency,
      date: startingDate,
      page: currentPageNo,
      // branch_id: branchId,
      department_id: departmentId,
      floor_id: floorId,
    });

  if (!data) return;

  const schedulingPeriodStartedAt = data?.data?.start_date;

  const transformedScheduling: TransformedRotaResponse =
    transformRotaByEmployee(data);

  return (
    <div>
      <div className="reload-btn-div-wrapper">
        <Button icon={<ReloadIcon />} onClick={refetch} title="Refresh" />
        <h1 className="section-title">Schedule Planner</h1>
      </div>

      {isFetching && !data ? (
        <FormSkeleton itemCount={1} columns={2} containerClassname="mb-6" />
      ) : (
        <div className="mb-6">
          <div className="flex flex-wrap gap-3 lg:gap-6 justify-between items-center mb-4">
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
                    setCurrentPageNo(1);
                  }}
                >
                  <LeftArrowIcon className="size-4 lg:size-auto" />
                </Button>

                <p className="text-base lg:text-lg 2xl:text-xl leading-none font-bold">
                  {formatScheduleDate(
                    startingDate ?? schedulingPeriodStartedAt,
                  )}
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
                    setCurrentPageNo(1);
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
                    setCurrentPageNo(1);
                  }
                }}
              />

              <CustomDatePicker
                selected={startingDate}
                onChange={(date: Date | null) => {
                  if (date) {
                    const firstOfMonth = moment(date)
                      .startOf("month")
                      .format("YYYY-MM-DD");
                    setStartingDate(firstOfMonth);
                    setCurrentPageNo(1);
                  }
                }}
                showMonthYearPicker
                dateFormat="MMMM yyyy"
                placeholder="Select Month"
                showIcon={true}
                className="!w-44"
              />
            </div>

            <div>
              {/* <Button variant="primary" onClick={() => setIsOpen(true)}>
                + New Shift
              </Button> */}

              {isOpen && <RotaModal isOpen={isOpen} setIsOpen={setIsOpen} />}
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {/* <div className="w-64">
              <Dropdown
                isClearable
                placeholder="Select Branch"
                options={
                  branchData?.data?.branches?.map((b) => ({
                    label: b.name,
                    value: b.id,
                  })) || []
                }
                value={branchId ? [branchId] : []}
                onChange={(vals) => setBranchId(vals[0])}
              />
            </div> */}
            {(floorData?.data?.floors?.data?.length || 0) > 0 &&
              (departmentData?.data?.departments?.length || 0) > 0 && (
                <FloorDepartmentFilter
                  floors={floorData?.data?.floors?.data || []}
                  departments={departmentData?.data?.departments || []}
                  selectedFloorId={floorId}
                  selectedDepartmentId={departmentId}
                  onChange={(fId, dId) => {
                    setFloorId(fId);
                    setDepartmentId(dId);
                    setCurrentPageNo(1);
                  }}
                />
              )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 gap-6 lg:justify-end items-center mb-4">
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          + New Shift
        </Button>

        <Button variant="neutral">Upload CSV</Button>

        <Button variant="fancy">AI Generate</Button>
      </div>

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
          pagination={{
            limit: transformedScheduling.per_page,
            offset: (currentPageNo - 1) * transformedScheduling.per_page,
            currentPage: currentPageNo,
            onPageChange: (page) => {
              setCurrentPageNo(page);
            },
            total: transformedScheduling.total,
          }}
        />
      </div>
    </div>
  );
}
