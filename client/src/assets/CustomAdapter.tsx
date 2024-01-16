import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const CustomAdapter = (
  //   options: AdapterOptions<string, typeof dayjs> | undefined
  options: any
) => {
  const adapter = new AdapterDayjs(options);

  return {
    ...adapter,
  };
};
