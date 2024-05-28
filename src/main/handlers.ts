import { ipcMain } from 'electron'
import SettingController from './controller/SettingController'

export const handler = [
  // setting handlers
  ipcMain.handle('getSetting', SettingController.getSetting),
  ipcMain.handle('updateSetting', SettingController.updateSetting),

  // student

]
