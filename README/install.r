После установки vite и перед установкой lerna
в package.json ставим
     "workspaces": [
        "packages/*"
      ],
и в корне создаём packages
далее
  npm i lerna -g  что бы пользоваться cli 
  npx lerna init

  Создавать заготовки пакетов lerna create имя_пакета.  будет добавляться в packages/
Если нужен storybook
  npx storybook@latest init
