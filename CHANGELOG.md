# Changelog

## [1.0.33] - 2025-08-18
### Fided
- Исправлены peerDependencies

## [1.0.34] - 2025-08-18
### Changes
- Понижение версии material

## [1.0.35] - 2025-08-18
### Fided
- Мелкие исправления

## [1.0.48] - 2025-08-18
### Fided
- Мелкие исправления 

## [1.1.7] - 2025-08-18
### Added
- Добавлена обработка network

## [1.1.9] - 2025-08-18
### Fixed
- Исправлена работа network

## [1.1.11] - 2025-08-18
### Added
- Socket 
### Changes
- Большие компоненты разбиты на доп пути
  import { Socket } from "rc-lib-ui/socket";
  import { Dashboard } from "rc-lib-ui/dashboard";
  import { Preloaders } from "rc-lib-ui/preloaders";


## [1.1.12] - 2025-08-27
### Changes
- Изменены зависимости peerDependencies

## [1.1.13] - 2025-08-28
### Changes
- Изменено свойство DashboardProps['listMenu'][number] = { ... "path на to" }

## [1.1.14] - 2025-08-28
### Changes
- Убран обязательная передача children в Socket.OfflineDetection. При передача children заменяет стандартный вывод (Режим Оффлине || Оффлине) в зависимости от isDisableConnectSocket

## [1.1.15] - 2025-08-28
### Fixed
- Мелкое исправление типов

## [1.1.18] - 2025-08-29
### Fixed
- Исправлены импорты

## [1.1.19] - 2025-09-01
### Added
- Dashboard statuses?.isMenu

## [1.1.20] - 2025-09-02
### Added
- Dashboard: Расширен classes

## [1.1.21] - 2025-09-02
### Added
- Dashboard: Добавлен MuiListMenu в itemsProps

## [1.1.22] - 2025-09-24
### Change
- Socket:ReConnectButton  setStatusDisableConnectSocket переименован в setIsDisableConnectSocket

## [1.1.23] - 2025-09-25
### Added 
- Добавлены 2 кнопки в Socket.Button   ReConnect и OfflineActive 

## [1.1.24] - 2025-09-26
### Change 
- Socket: ConnectDetection, OfflineDetection. Можно прокинуть свойства. В том числе sx
## [1.1.25] - 2025-09-26
### Fixed 
- Socket: OfflineDetection. Поправлены стили. Убранны классы bootstrap
## [1.1.27] - 2025-09-26
### Fixed 
- Socket: OfflineDetection. Подкорректирован цвет.
## [1.1.28] - 2025-09-26
### Added
- SocketApi: getOptions. Добавлен просмотр опций для анализа передачи init данных.
## [1.1.45] - 2025-10-14
### Added
- Socket: socketSelectors.getReadySocket.
## [1.1.47] - 2025-10-14
### Fixed
- Socket: Мелкие исправления 
## [1.1.48] - 2025-10-20
### Fixed
- Socket: SocketApi.getStatusSocket отрабатывает раньше чем  on('status', () => {})