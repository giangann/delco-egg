import { yupResolver } from "@hookform/resolvers/yup";
import React, { createContext, useEffect, useState } from "react";
import { Resolver, UseFormReturn, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { array, number, object, string } from "yup";
import { ConfirmDialog } from "../../components/Dialog/ConfirmDialog";
import { getApi, postApi } from "../../lib/utils/fetch/fetchRequest";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { commonDateWithMySqlFormat } from "../../shared/helpers/function";
import { IEggPriceQty } from "../../shared/types/egg";
import { IOrder } from "../../shared/types/order";
import { WaitingUpdatePrice } from "../Home/WaitingUpdatePrice";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step1 } from "./Step1";
import { ProcessBar } from "./ProcessBar";

export const MAX_STEP = 3;

type FormContextType = {
  data: IEggPriceQty[];
  form?: UseFormReturn<IOrder>;
};

const orderItemsSchema = object({
  egg_id: number().required("Chọn loại trứng"),
  quantity: number().required("Số lượng không được bỏ trống"),
  deal_price: number().required("Giá không được bỏ trống"),
});
const ordersSchema = array(orderItemsSchema);
const formSchema = object({
  date: string().required("Ngày không được bỏ trống"),
  time: string().required("Giờ k đc bỏ tróng"),
  orders: ordersSchema,
});

export const FormContext = createContext<FormContextType>({
  data: [],
});
export const CreateForm = () => {
  const [listEggPriceQty, setListEggPriceQty] = useState<IEggPriceQty[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const currStep = Number(searchParams.get("step"));

  const useFormReturns = useForm<IOrder>({
    resolver: yupResolver(formSchema) as Resolver<IOrder, any>,
    defaultValues: {
      date: commonDateWithMySqlFormat().today,
    },
  });
  const {
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormReturns;

  const onSubmit = async () => {
    console.log("submit", errors);
    const formData = getValues();
    const orderData: IOrder = {
      ...formData,
      orders: formData.orders.filter((order) => order != null),
    };

    const res = await postApi("order", orderData);

    if (res.success) {
      toast.success("Tạo yêu cầu thành công, đang đợi Admin phê duyệt");
      navigate(SCREEN_PATHS.LIST);
    }

    setOpenConfirm(false);
  };

  const Steps: Record<string, React.ReactNode> = {
    1: <Step1 />,
    2: <Step2 />,
    3: <Step3 />,
  };

  useEffect(() => {
    if (!currStep) {
      setSearchParams({ step: `${1}` });
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchEggPriceQty() {
      const res = await getApi("egg-price-qty");
      if (res.success) setListEggPriceQty(res.data);
    }
    fetchEggPriceQty();
  }, []);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        {listEggPriceQty.length ? (
          <FormContext.Provider
            value={{ data: listEggPriceQty, form: useFormReturns }}
          >
            {Steps[currStep]}

            {/* Button navbar area */}
            <ProcessBar setOpenConfirm={setOpenConfirm} currStep={currStep} />
          </FormContext.Provider>
        ) : (
          <WaitingUpdatePrice />
        )}
        <ConfirmDialog
          open={openConfirm}
          onClose={() => setOpenConfirm(false)}
          // onAccept={handleSubmit}
          title="Xác nhận đơn hàng"
          content="Yêu cầu mua hàng của bạn sẽ được gửi cho Admin phê duyệt"
          isSubmitting={isSubmitting}
          disablePortal={true}
          insideFormEl={true}
        />
      </form>
    </React.Fragment>
  );
};
