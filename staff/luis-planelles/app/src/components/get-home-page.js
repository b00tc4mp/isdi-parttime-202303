let homePage;

const getHomePage = () => {
  if (!homePage) {
    homePage = document.querySelector('.home');
  }
  return homePage;
};

export default getHomePage;
