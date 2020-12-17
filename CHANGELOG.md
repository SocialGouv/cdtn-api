# [1.7.0](https://github.com/SocialGouv/cdtn-api/compare/v1.6.4...v1.7.0) (2020-12-17)


### Features

* upgrade CI deps ([#60](https://github.com/SocialGouv/cdtn-api/issues/60)) ([7a3428c](https://github.com/SocialGouv/cdtn-api/commit/7a3428c9150b4fea9c70a9e896059bd5c672ea41))

## [1.6.4](https://github.com/SocialGouv/cdtn-api/compare/v1.6.3...v1.6.4) (2020-11-26)


### Bug Fixes

* use @socialgouv/kali-data ([#54](https://github.com/SocialGouv/cdtn-api/issues/54)) ([967ef48](https://github.com/SocialGouv/cdtn-api/commit/967ef48f8a617af8eca4f091af7c582644d49c07)), closes [/github.com/SocialGouv/kali-data/commit/94a0767a8ad835a542a9aec93f0b86fabe32d0cb#diff-cf904c3b3dbb054d78c122ac10b09f0384c652a65a53a8542e90219dbbf9460](https://github.com//github.com/SocialGouv/kali-data/commit/94a0767a8ad835a542a9aec93f0b86fabe32d0cb/issues/diff-cf904c3b3dbb054d78c122ac10b09f0384c652a65a53a8542e90219dbbf9460)

## [1.6.3](https://github.com/SocialGouv/cdtn-api/compare/v1.6.2...v1.6.3) (2020-10-22)


### Bug Fixes

* kosko preprod ([#49](https://github.com/SocialGouv/cdtn-api/issues/49)) ([619e22b](https://github.com/SocialGouv/cdtn-api/commit/619e22b400031203b22aae9de72fbc18c28e298c))

## [1.6.2](https://github.com/SocialGouv/cdtn-api/compare/v1.6.1...v1.6.2) (2020-10-22)


### Bug Fixes

* **k8s:** upgrade RAM limits ([#48](https://github.com/SocialGouv/cdtn-api/issues/48)) ([7262407](https://github.com/SocialGouv/cdtn-api/commit/7262407ebf00032923cdae69003be5c47992650d))

## [1.6.1](https://github.com/SocialGouv/cdtn-api/compare/v1.6.0...v1.6.1) (2020-08-28)


### Bug Fixes

* **k8s:** increase limits ([#44](https://github.com/SocialGouv/cdtn-api/issues/44)) ([8d80adb](https://github.com/SocialGouv/cdtn-api/commit/8d80adb2c78f7f378e0af91681749188a5b9ace8))

# [1.6.0](https://github.com/SocialGouv/cdtn-api/compare/v1.5.4...v1.6.0) (2020-08-27)


### Features

* use kosko-charts:2.2.0 ([#42](https://github.com/SocialGouv/cdtn-api/issues/42)) ([07e13e2](https://github.com/SocialGouv/cdtn-api/commit/07e13e24413350c399cc4ad0fca671204aa2ab5e))

## [1.5.4](https://github.com/SocialGouv/cdtn-api/compare/v1.5.3...v1.5.4) (2020-07-20)


### Bug Fixes

* **k8s:** change dev request limit ([8843083](https://github.com/SocialGouv/cdtn-api/commit/8843083edb7f873cad1d1420731a60773594ffae))

## [1.5.3](https://github.com/SocialGouv/cdtn-api/compare/v1.5.2...v1.5.3) (2020-07-09)


### Bug Fixes

* **swagger:** host url ([#36](https://github.com/SocialGouv/cdtn-api/issues/36)) ([e291153](https://github.com/SocialGouv/cdtn-api/commit/e291153e06f0fe836158403135b903beaf44b06c))

## [1.5.2](https://github.com/SocialGouv/cdtn-api/compare/v1.5.1...v1.5.2) (2020-07-07)


### Reverts

* Revert "fix(ci): remove custom yarn cache folder in docker image" (#33) ([84d396f](https://github.com/SocialGouv/cdtn-api/commit/84d396f9601c7db7ad2efa448cf201a008ce1be2)), closes [#33](https://github.com/SocialGouv/cdtn-api/issues/33)

## [1.5.1](https://github.com/SocialGouv/cdtn-api/compare/v1.5.0...v1.5.1) (2020-07-07)


### Bug Fixes

* **ci:** remove custom yarn cache folder in docker image ([#32](https://github.com/SocialGouv/cdtn-api/issues/32)) ([ab50a77](https://github.com/SocialGouv/cdtn-api/commit/ab50a77489f03b3b5eefd58c8472e28d86f5a21a))

# [1.5.0](https://github.com/SocialGouv/cdtn-api/compare/v1.4.2...v1.5.0) (2020-07-06)


### Features

* optimize agreements article path generation ([#25](https://github.com/SocialGouv/cdtn-api/issues/25)) ([8ce7f4b](https://github.com/SocialGouv/cdtn-api/commit/8ce7f4b3e066638e74c28b331b7d4f5a2ed4cf3f))

## [1.4.2](https://github.com/SocialGouv/cdtn-api/compare/v1.4.1...v1.4.2) (2020-07-06)


### Bug Fixes

* **gitlab:** update socialgouv/gitlab-ci-yml to v17.0.0-beta.31 ([#29](https://github.com/SocialGouv/cdtn-api/issues/29)) ([6eb926a](https://github.com/SocialGouv/cdtn-api/commit/6eb926ad966df57416c97e62bd8fc589fdc87d84))
* disable cache seeding ([#24](https://github.com/SocialGouv/cdtn-api/issues/24)) ([af5637a](https://github.com/SocialGouv/cdtn-api/commit/af5637ad1b930839bca357e9feec578439aa4ad6))
* run cache seeding in a forked child process ([#22](https://github.com/SocialGouv/cdtn-api/issues/22)) ([6075790](https://github.com/SocialGouv/cdtn-api/commit/60757901a6292df206976e0e6791ae1ab66164f2))
* switch cache seeding from script strategy to core code helper ([#23](https://github.com/SocialGouv/cdtn-api/issues/23)) ([7d0b887](https://github.com/SocialGouv/cdtn-api/commit/7d0b88730f3fbe162cc8437da6b98eb9660c442a))

## [1.4.1](https://github.com/SocialGouv/cdtn-api/compare/v1.4.0...v1.4.1) (2020-07-03)


### Bug Fixes

* force new release ([#20](https://github.com/SocialGouv/cdtn-api/issues/20)) ([cd82e24](https://github.com/SocialGouv/cdtn-api/commit/cd82e242578aebf66c160041560cdb25dc0246d1))

# [1.4.0](https://github.com/SocialGouv/cdtn-api/compare/v1.3.0...v1.4.0) (2020-07-03)


### Bug Fixes

* copy missing script in dockerfile ([#18](https://github.com/SocialGouv/cdtn-api/issues/18)) ([8ca4ab0](https://github.com/SocialGouv/cdtn-api/commit/8ca4ab0df07ead7ab2711bfa4cef928af38dbd0a))


### Features

* add articles batch call ([#17](https://github.com/SocialGouv/cdtn-api/issues/17)) ([1b47258](https://github.com/SocialGouv/cdtn-api/commit/1b47258010eff904decdf074ce3ae906a314290e))

# [1.3.0](https://github.com/SocialGouv/cdtn-api/compare/v1.2.10...v1.3.0) (2020-06-24)


### Features

* add container id in articles list ([#12](https://github.com/SocialGouv/cdtn-api/issues/12)) ([7adefe5](https://github.com/SocialGouv/cdtn-api/commit/7adefe5f85ec0ac95f27bd9c8493acbf7302954d))

## [1.2.10](https://github.com/SocialGouv/cdtn-api/compare/v1.2.9...v1.2.10) (2020-06-22)


### Performance Improvements

* **docker:** separate install and file cp ([#11](https://github.com/SocialGouv/cdtn-api/issues/11)) ([64f5221](https://github.com/SocialGouv/cdtn-api/commit/64f5221968ecd936132d9bef365bc216c9815551))

## [1.2.9](https://github.com/SocialGouv/cdtn-api/compare/v1.2.8...v1.2.9) (2020-06-22)


### Bug Fixes

* **gitlab:** update socialgouv/gitlab-ci-yml to v17.0.0-beta.29 ([89f4fd2](https://github.com/SocialGouv/cdtn-api/commit/89f4fd257c89297ef68885731dc457d2507c8cf6))

## [1.2.8](https://github.com/SocialGouv/cdtn-api/compare/v1.2.7...v1.2.8) (2020-06-22)


### Bug Fixes

* **autodevops:** ensure that the auto ship to production works (5) ([742cbcf](https://github.com/SocialGouv/cdtn-api/commit/742cbcff65fbdf3e6b9dcb1e0b5c9b767c6232b8))

## [1.2.7](https://github.com/SocialGouv/cdtn-api/compare/v1.2.6...v1.2.7) (2020-06-22)


### Bug Fixes

* **autodevops:** ensure that the auto ship to production works (4) ([6319ab3](https://github.com/SocialGouv/cdtn-api/commit/6319ab34a5889a8aa7977a60edf97e01f844acdb))
* **release:** add missing npm plugin ([3a49480](https://github.com/SocialGouv/cdtn-api/commit/3a49480bc20dee37ddffb42d57319d5478a32a68))

## [1.2.6](https://github.com/SocialGouv/cdtn-api/compare/v1.2.5...v1.2.6) (2020-06-22)


### Bug Fixes

* **autodevops:** ensure that the auto ship to production works (3) ([29c36d1](https://github.com/SocialGouv/cdtn-api/commit/29c36d198d7a241c706f90a190ce64b92c1282fd))

## [1.2.5](https://github.com/SocialGouv/cdtn-api/compare/v1.2.4...v1.2.5) (2020-06-22)


### Bug Fixes

* **autodevops:** ensure that the auto ship to production works (2) ([295c529](https://github.com/SocialGouv/cdtn-api/commit/295c529e9fa8de96f31654be63d726633af5dcec))

## [1.2.4](https://github.com/SocialGouv/cdtn-api/compare/v1.2.3...v1.2.4) (2020-06-22)


### Bug Fixes

* **k8s:** increase limits ([80bad4b](https://github.com/SocialGouv/cdtn-api/commit/80bad4b9aeb8d7ea2133f4809bb8f6314f3e979a))

## [1.2.3](https://github.com/SocialGouv/cdtn-api/compare/v1.2.2...v1.2.3) (2020-06-22)


### Bug Fixes

* **autodevops:** ensure that the auto ship to production works ([26257b9](https://github.com/SocialGouv/cdtn-api/commit/26257b9f1ed61510cf8fbf9e6e97582b4225e86c))

## [1.2.2](https://github.com/SocialGouv/cdtn-api/compare/v1.2.1...v1.2.2) (2020-06-22)


### Bug Fixes

* **release:** add missing release config file ([bc6c30b](https://github.com/SocialGouv/cdtn-api/commit/bc6c30b6755d67e2716e752b860da0f7d1b7616d))
