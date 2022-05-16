module.exports = {
	roots: ['<rootDir>/lib/'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	testMatch: ['**/*.(spec|test).ts'],
	clearMocks: true,
	bail: false,
	globals: {
		'ts-jest': {
			isolatedModules: true,
			tsconfig: 'tsconfig.json',
		},
	},
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	moduleNameMapper: {
		'@types/(.*)': '<rootDir>/lib/types/$1',
		'@types': '<rootDir>/lib/types/',
		'@lib': '<rootDir>/lib/',
	},
};