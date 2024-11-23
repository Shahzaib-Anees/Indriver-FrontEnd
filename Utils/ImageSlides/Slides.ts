const randomIdGenerator = () => {
  let id: any[] = [];
  for (let i = 0; i < 9; i++) {
    let randomNumber = Math.floor(Math.random() * 10);
    id.push(randomNumber);
  }
  return id.join("");
};
export default [
  {
    id: randomIdGenerator(),
    title: "App where you set the price",
    image: require("@/assets/images/indriveAuthenticatiuonInterfaceImage2.png"),
    subtitle1: "Find the best offers from drivers, passengers and more",
    width: 235,
    height: 235,
  },
  {
    id: randomIdGenerator(),
    image: require("@/assets/images/indriveAuthenticatiuonInterfaceImage1.png"),
    title: "Your safety is our privacy",
    subtitle1: "Only verified service providers.",
    subtitle2: "Choose yours by rating and other info",
    width: 210,
    height: 210,
  },
];
