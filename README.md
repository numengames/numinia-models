# Numinia Models

> MongoDB models for Numinia projects

## Requirements

This project requires the following dependencies:

- **MongoDB**: Version 7.x or higher
- **Node.js**: Version 20.x or higher
- **Mongoose**: Version 8.x or higher

## Installing

For the latest stable version:

```bash
npm install -S @numengames/numinia-models
```

## Publishing

- Move the git pointer to the master branch.
- Use the runners major/minor/patch according to semver
- npm will push the image to the registry and create the tag

## Collections

- player: Stores all player information, including playerName, oncyberId, hyperfyId, and player statuses like isActive and isBlocked.
- logs: Tracks events within the game, such as teleport, redirect, insert password, AI interactions, obtaining NFTs, and asset acquisitions.
- conversation: Stores all kind of conversations.
- user: Stores all our users with its kind of accounts.
- conversation-chunk: Stores all the messages related to a specific conversation.
- playerSessions: Records player session data, including session start and end times.

## Dependencies

- [lodash](https://npmjs.com/package/lodash)
- [mongoose](https://npmjs.com/package/mongoose)
- [typescript](https://npmjs.com/package/typescript)

## DevDependencies

- [@faker-js/faker](https://npmjs.com/package/@faker-js/faker)
- [@shelf/jest-mongodb](https://npmjs.com/package/@shelf/jest-mongodb)
- [@tsconfig/node16](https://npmjs.com/package/@tsconfig/node16)
- [@types/lodash](https://npmjs.com/package/@types/lodash)
- [@typescript-eslint/eslint-plugin](https://npmjs.com/package/@typescript-eslint/eslint-plugin)
- [@typescript-eslint/parser](https://npmjs.com/package/@typescript-eslint/parser)
- [eslint](https://npmjs.com/package/eslint)
- [eslint-config-airbnb-base](https://npmjs.com/package/eslint-config-airbnb-base)
- [eslint-plugin-jest](https://npmjs.com/package/eslint-plugin-jest)
- [jest](https://npmjs.com/package/jest)
- [jsdoc](https://npmjs.com/package/jsdoc)
- [pre-push](https://npmjs.com/package/pre-push)
- [ts-jest](https://npmjs.com/package/ts-jest)
- [np](https://www.npmjs.com/package/np)

## Contributing

We welcome contributions! If you'd like to improve this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/awesome-feature).
3. Make your changes and commit them (git commit -am 'Add an awesome feature').
4. Push the branch (git push origin feature/awesome-feature).
5. Open a pull request.
