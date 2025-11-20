---
editLink: false
---

# Open Standards

Hellō's founder, Dick Hardt, has been at the forefront of internet identity standards since the early 2000s. He co-founded the [OpenID Foundation](https://openid.net/foundation/) and led the design of two foundational technologies: [OAuth 2.0](https://datatracker.ietf.org/doc/rfc6749/) and JSON Web Token (JWT) — standards used by billions of people every day.

Dick continues his work to create a #BetterInternet through open, user-centric identity protocols. Following are some of the standards being actively developed:


## EVP
#### Email Verification Protocol
Verifying control of an email is a hassle for users, and is a source of friction for web sites. EVP allows a user to prove they control an email address without leaving the website. 

Dick is one of the authors of the [EVP](https://github.com/WICG/email-verification-protocol)


## IPSIE
#### Interoperability Profiling for Secure Identity in the Enterprise

Existing enterprise identity standards are typically frameworks that have significant optionality. This creates friction in deployment and security risk. IPSIE is creating profiles of existing standards to meet different levels of functionality in session lifecycle and account lifecycle. The goal is for customers to ask for the IPSIE level they require, rather than SAML and bespoke security criteria

Dick is one of the co-chairs of the [IPSIE working group](https://openid.net/wg/ipsie/).

## OpenID Enterprise Extensions

There are some gaps in OpenID Connect for it to be compliant with IPSIE. Creating new specifications is not within the IPSIE charter. OpenID Enterprise Extensions fills those gaps. 

Dick is one of the authors [OpenID Enterprise Extensions](https://github.com/openid/connect-enterprise-extensions)

## OPC
#### OpenID Provider Commands

Offboarding users is 80% of the value in synchronizing accounts between the enterprise and their SaaS applications, and there is no standard for invalidating existing sessions. OPC is a simpler approach that builds on the OpenID Connect schema. 

Dick is one of the authors of [OPC](https://github.com/openid/openid-provider-commands)


## OpenID Connect Key Binding

Relying Parties may be composed of a number of components. Demonstrating proof of possession (DPoP0  of a cryptographic key when sharing an ID Token between components improves security. This specification defines how a relying party can have its key bound to an ID Token by the OpenID Provider.

Dick is one of the authors of [OpenID Connect Key Binding](https://github.com/openid/connect-key-binding)

## JWT BCP
#### JSON Web Token Best Current Practices

Guiding implementors in the best practices when working with JSON Web Tokens improves the security of the internet. This is an update to the earlier BCP.

Dick is one of the authors of the [JWT BCP](https://datatracker.ietf.org/doc/draft-ietf-oauth-rfc8725bis/)


## OAuth 2.1

Implementors often need to review over a dozen documents to deploy OAuth 2.0 today. OAuth 2.1 collects all the current best practices into one document.

Hellō is OAuth 2.1 compliant.

Dick is one of the authors of [OAuth 2.1](https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/)

