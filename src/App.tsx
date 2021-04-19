import React from "react";
import { IntlProvider, defineMessages, FormattedMessage } from "react-intl"
import { useSelector } from "react-redux";
import { selectLocale } from "./features/locales/localeSlice";
import Grid from "./features/grid/Grid";
import en from "./translations/en.json";
import br from "./translations/br.json";
import "./App.css";

const text = defineMessages({
  title: {
    id: "Title",
    defaultMessage: "Blocktown",
  },
});

const messages: any = {
  en,
  br
}

function App() {
  const lang = useSelector(selectLocale)
  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <div className="App">
        <header className="App-header">
          <FormattedMessage {...text.title} />
        </header>
        <Grid />
      </div>
    </IntlProvider>
  );
}

export default App;
