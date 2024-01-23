import { IEgg } from "../types/egg";

export const listForms = [
  {
    formId: "EGG-123",
    dateCreated: "22/01/2024",
    timeCreated: "16:25",
    status: "Chờ phê duyệt",
    totalPrice: 6500000,
  },
  {
    formId: "EGG-123",
    dateCreated: "22/01/2024",
    timeCreated: "16:25",
    status: "Chờ phê duyệt",
    totalPrice: 6500000,
  },
  {
    formId: "EGG-123",
    dateCreated: "22/01/2024",
    timeCreated: "16:25",
    status: "Chờ phê duyệt",
    totalPrice: 6500000,
  },
  {
    formId: "EGG-123",
    dateCreated: "22/01/2024",
    timeCreated: "16:25",
    status: "Chờ phê duyệt",
    totalPrice: 6500000,
  },
  {
    formId: "EGG-123",
    dateCreated: "22/01/2024",
    timeCreated: "16:25",
    status: "Chờ phê duyệt",
    totalPrice: 6500000,
  },
  {
    formId: "EGG-123",
    dateCreated: "22/01/2024",
    timeCreated: "16:25",
    status: "Chờ phê duyệt",
    totalPrice: 6500000,
  },
  {
    formId: "EGG-123",
    dateCreated: "22/01/2024",
    timeCreated: "16:25",
    status: "Chờ phê duyệt",
    totalPrice: 6500000,
  },
  {
    formId: "EGG-123",
    dateCreated: "22/01/2024",
    timeCreated: "16:25",
    status: "Chờ phê duyệt",
    totalPrice: 6500000,
  },
];

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const listItems = [
  {
    egg: {
      id: 1,
      name: "Mix 1",
      weight: 100,
      price: 3000,
      onStock: 60000,
    },
    deal_price: 3000,
    quantity: 50000,
  },
  {
    egg: {
      id: 2,
      name: "Mix 2",
      weight: 100,
      price: 3000,
      onStock: 60000,
    },
    deal_price: 3000,
    quantity: 50000,
  },
  {
    egg: {
      id: 3,
      name: "Mix 3",
      weight: 100,
      price: 3000,
      onStock: 60000,
    },
    deal_price: 3000,
    quantity: 50000,
  },
  {
    egg: {
      id: 4,
      name: "Mix 4",
      weight: 100,
      price: 3000,
      onStock: 60000,
    },
    deal_price: 3000,
    quantity: 50000,
  },
  {
    egg: {
      id: 5,
      name: "Mix 5",
      weight: 100,
      price: 3000,
      onStock: 60000,
    },
    deal_price: 3000,
    quantity: 50000,
  },
  {
    egg: {
      id: 6,
      name: "Mix 6",
      weight: 100,
      price: 3000,
      onStock: 60000,
    },
    deal_price: 3000,
    quantity: 50000,
  },
];

export const randomizedListItems = listItems.map((item) => {
  const { id, name } = item.egg;

  return {
    egg: {
      id,
      name,
      weight: getRandomNumber(50, 150),
      price: getRandomNumber(2000, 5000),
      onStock: getRandomNumber(50000, 100000),
    },
    deal_price: getRandomNumber(2000, 5000),
    quantity: getRandomNumber(10000, 50000),
  };
});

export const randomizedListEgg: IEgg[] = listItems.map((item) => {
  const { id, name } = item.egg;

  return {
    id,
    name,
    weight: getRandomNumber(50, 150),
    price: getRandomNumber(2000, 5000),
    onStock: getRandomNumber(50000, 100000),
  };
});
