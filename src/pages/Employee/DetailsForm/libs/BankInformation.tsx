import HookFormItem from "@/components/shared/hookform/HookFormItem";
import Input from "@/components/common/Input";

const BankInformation = () => {
  return (
    <div className="p-6">
      <h5 className="form-subsection-title">Bank Information</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <HookFormItem name="bank_acc_name" label="Account Name">
          <Input />
        </HookFormItem>

        <HookFormItem name="bank_acc_number" label="Account Number">
          <Input />
        </HookFormItem>

        <HookFormItem name="bank_routing_number" label="Routing Number">
          <Input />
        </HookFormItem>

        <HookFormItem name="bank_address" label="Bank Address">
          <Input />
        </HookFormItem>
      </div>
    </div>
  );
};

export default BankInformation;
