import { Launches } from "./app/components/Launches/Launches";
import { PageLayout } from "./app/components/PageLayout/PageLayout";
import { Filter } from "./app/components/Filter/Filter";

function App() {
  return <PageLayout header={<Filter />} content={<Launches />} />;
}

export default App;
