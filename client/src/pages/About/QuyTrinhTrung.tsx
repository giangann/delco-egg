export const QuyTrinhTrung = () => {
  const height = window.innerHeight - 70;
  return (
    <div>
      <iframe
        src="./html_craw/quy-trinh-trung.html"
        width="100%"
        height={height}
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};
