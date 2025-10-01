import { createReportableStore } from "./middleware";

interface GlobalStore {}

const useGlobalStore = createReportableStore<GlobalStore>(() => ({}));

export { useGlobalStore };
