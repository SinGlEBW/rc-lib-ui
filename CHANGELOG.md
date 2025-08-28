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