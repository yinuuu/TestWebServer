import defaultSettings from '@/settings'

const title = ((window.globalConfig && window.globalConfig.system) ? window.globalConfig.system.title : '') || defaultSettings.title || '金仕达前端架构'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
