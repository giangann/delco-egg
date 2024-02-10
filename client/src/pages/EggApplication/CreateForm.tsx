import { Container, Typography } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { Resolver, UseFormReturn, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ConfirmDialog } from "../../components/Dialog/ConfirmDialog";
import { getApi, postApi } from "../../lib/utils/fetch/fetchRequest";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { IEggPriceQty } from "../../shared/types/egg";
import { IOrder } from "../../shared/types/order";
import { LinkCustom } from "../../styled/styled";
import { WaitingUpdatePrice } from "../Home/WaitingUpdatePrice";
import { ChooseTimeOpt1 } from "./ChooseTimeOpt1";
import { Confirm } from "./Confirm";
import { CreateFormOpt2 } from "./CreateFormOpt2";
import { ProcessBar } from "./ProcessBar";
import { array, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { commonDateWithMySqlFormat } from "../../shared/helpers/function";

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
    1: <CreateFormOpt2 />,
    2: <ChooseTimeOpt1 />,
    3: <Confirm />,
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
