import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { registerCondition } from "./quartz/plugins/loader/conditions"

// 홈페이지(index)에서만 컴포넌트를 렌더하기 위한 커스텀 레이아웃 조건
registerCondition("is-index", (props) => props.fileData.slug === "index")

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
