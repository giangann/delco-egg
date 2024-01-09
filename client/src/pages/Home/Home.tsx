import SCREEN_PATHS from "../../shared/constants/screenPaths";

export const Home = () => {
  return (
    <div
      style={{ width: "80vw", height: "50vh", backgroundColor: "whitesmoke" }}
    >
      <p>Home</p>
      {items.map((item: Item, index: number) => (
        <div
          key={index}
          style={{ backgroundColor: "chocolate", padding: "16px" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h6>{item.text}</h6>
            <a href={item.path}>
              <p>{">>>"}go</p>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
type Item = {
  path: string;
  text: string;
};
const items: Item[] = [
  {
    path: SCREEN_PATHS.CREATE,
    text: "Tạo đơn đặt trứng",
  },
  {
    path: SCREEN_PATHS.LIST,
    text: "Lịch sử  đặt trúng",
  },
  {
    path: SCREEN_PATHS.ABOUT,
    text: "Về chúng tôi",
  },
  {
    path: SCREEN_PATHS.CONTACT,
    text: "Liên hệ",
  },
];
