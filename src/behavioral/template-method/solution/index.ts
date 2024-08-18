abstract class WebPage {
  renderHeader() { console.log('this is header'); }
  abstract renderBody(): void;
  renderFooter() { console.log('this is footer'); }

  render() {
    this.renderHeader();
    this.renderBody();
    this.renderFooter();
  }
}

class HomePage extends WebPage {
  renderBody(): void {
    console.log('this is home page');
  }
}

class ProductPage extends WebPage {
  renderBody(): void {
    console.log('this is product page');
  }
}

abstract class NoHeaderAndFooterWebPage extends WebPage {
  renderHeader() { console.log('no header'); }
  renderFooter() { console.log('no footer'); }
}

class LoginPage extends NoHeaderAndFooterWebPage {
  renderBody(): void {
    console.log('this is login page');
  }
}

class RegisterPage extends NoHeaderAndFooterWebPage {
  renderBody(): void {
    console.log('this is register page');
  }
}

const homePage = new HomePage();
homePage.render();

const productPage = new ProductPage();
productPage.render();
