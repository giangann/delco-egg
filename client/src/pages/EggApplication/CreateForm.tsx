import React, { createContext, useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ConfirmDialog } from "../../components/Dialog/ConfirmDialog";
import { getApi, postApi } from "../../lib/utils/fetch/fetchRequest";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { IEggPriceQty } from "../../shared/types/egg";
import { IOrder } from "../../shared/types/order";
import { ChooseTimeOpt1 } from "./ChooseTimeOpt1";
import { Confirm } from "./Confirm";
import { CreateFormOpt2 } from "./CreateFormOpt2";
import { ProcessBar } from "./ProcessBar";
import { WaitingUpdatePrice } from "../Home/WaitingUpdatePrice";
import { Box, Container, Typography } from "@mui/material";
import { LinkCustom } from "../../styled/styled";

export const MAX_STEP = 3;

type FormContextType = {
  data: IEggPriceQty[];
  form?: UseFormReturn<IOrder>;
};
export const FormContext = createContext<FormContextType>({
  data: [],
});
export const CreateForm = () => {
  const [listEggPriceQty, setListEggPriceQty] = useState<IEggPriceQty[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const currStep = Number(searchParams.get("step"));

  const useFormReturns = useForm<IOrder>();
  const { getValues } = useFormReturns;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formData = getValues();
    const orderData: IOrder = {
      ...formData,
      orders: formData.orders.filter((order) => order != null),
    };

    const res = await postApi("order", orderData);

    console.log(res);
    if (res.success) {
      toast.success("Tạo yêu cầu thành công, đang đợi Admin phê duyệt");
      navigate(SCREEN_PATHS.LIST);
    }

    setIsSubmitting(false);
  };

  const Steps: Record<string, React.ReactNode> = {
    1: <CreateFormOpt2 />,
    2: <ChooseTimeOpt1 {...useFormReturns} />,
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
      {listEggPriceQty.length ? (
        <FormContext.Provider
          value={{ data: listEggPriceQty, form: useFormReturns }}
        >
          {Steps[currStep]}

          {/* Button navbar area */}
          <ProcessBar setOpenConfirm={setOpenConfirm} currStep={currStep} />
        </FormContext.Provider>
      ) : (
        <Container>
          <WaitingUpdatePrice />
          <LinkCustom to={"/"}>
            <Typography textAlign={'center'}>{'<<< Về trang chủ'}</Typography>
          </LinkCustom>
        </Container>
      )}
      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onAccept={handleSubmit}
        title="Xác nhận đơn hàng"
        content="Yêu cầu mua hàng của bạn sẽ được gửi cho Admin phê duyệt"
        isSubmitting={isSubmitting}
      />
    </React.Fragment>
  );
};
