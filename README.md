# CDTN API

[![Licence][img-license]][link-license]
[![Code Coverage][img-coverage]][link-coverage]

- [API](#api)
  - [[GET] `/`](#get-)
  - [[GET] `/agreement/{agreementIdOrIdcc}`](#get-agreementagreementidoridcc)
  - [[GET] `/agreements`](#get-agreements)
  - [[GET] `/article/{articleId}`](#get-articlearticleid)
  - [[GET] `/articles`](#get-articles)

## API

### [GET] `/`

[Swagger 2.0](https://swagger.io/docs/) description.

### [GET] `/agreement/{agreementIdOrIdcc}`

Raw agreement [unist][link-unist] tree (with parent sections attached to each article).

**Path:**

- `agreementIdOrIdcc`: `string` Agreement ID or IDCC. **Required**.

### [GET] `/agreements`

Indexed agreements list.

**Query:**
- `query`: `string` Search query.

### [GET] `/article/{articleId}`

Article item.

**Path:**
- `articleId`: `string` Article ID. **Required**.
 
### [GET] `/articles`

Articles list.

**Query:**
- `agreementIdOrIdcc`: `string` Agreement ID or IDCC. **Required**.
- `query`: `string` Search query. **Required**.

---

[img-coverage]: https://badgen.net/codecov/c/github/SocialGouv/cdtn-api?style=flat-square
[img-license]: https://badgen.net/github/license/SocialGouv/cdtn-api?style=flat-square

[link-coverage]: https://codecov.io/gh/SocialGouv/cdtn-api
[link-license]: https://github.com/SocialGouv/cdtn-api/blob/master/LICENSE
