---
editLink: true
---

# Standards

Hellō's founder, Dick Hardt, has been at the forefront of internet identity standards since the early 2000s. He co-founded the OpenID Foundation and led the design of foundational technologies like OAuth 2.0 and JSON Web Token (JWT) — standards used by billions of people every day.

Today, Hellō continues to lead standards efforts at the OpenID Foundation, IETF, and W3C, working to create a #BetterInternet through open, user-centric identity protocols.

## Secure Redirect
<span class="in-progress">November, 2025</span>

A specification that defines secure methods for handling redirect URIs in authentication flows, preventing open redirect vulnerabilities and phishing attacks. As authentication flows become more complex and attackers increasingly target redirect mechanisms, a standardized approach to secure redirects is essential to protect users. Hellō implements secure redirect practices to ensure that all authentication redirects are validated and safe, protecting users during the critical authentication flow where they're most vulnerable to attacks.

[Draft Spec](https://github.com/dickhardt/secure-redirect)

## JSON Web Token Best Current Practices
<span class="in-progress">November, 2025</span>

An update to [RFC 8725](https://datatracker.ietf.org/doc/html/rfc8725) that consolidates best practices for implementing JSON Web Tokens securely, addressing common vulnerabilities like token leakage, replay attacks, and improper validation. With JWTs being used by billions of people daily, establishing and maintaining current best practices is critical to prevent widespread security issues. Hellō relies on JWTs for secure token-based authentication and authorization, and following these best practices ensures the integrity and security of our identity infrastructure.

[IETF Spec](https://www.ietf.org/archive/id/draft-sheffer-oauth-rfc8725bis-01.html)

## OpenID Connect Enterprise Extensions
<span class="in-progress">September, 2025</span>

Extensions to OpenID Connect that address enterprise-specific needs, including multi-tenancy, organizational hierarchies, and enhanced session management. As enterprises require more sophisticated identity solutions to handle complex organizational structures and compliance requirements, these extensions provide the necessary capabilities. Hellō serves enterprise clients who need robust B2B identity management, and implementing these extensions enables us to support complex enterprise scenarios while maintaining our single integration point for developers.

[Draft Spec](https://openid.net/specs/openid-connect-enterprise-extensions-1_0.html)

## OpenID Provider Commands
<span class="in-progress">September, 2025</span>

A specification that defines commands for OpenID Providers to manage end-user accounts at Relying Parties, enabling operations like account activation, suspension, and deletion. As identity management becomes more dynamic and compliance requirements grow, standardized commands enable efficient account lifecycle management across services. Hellō implements these commands to provide seamless account management capabilities, allowing enterprise customers to efficiently manage user access and ensuring compliance with data protection regulations.

[Draft Spec](https://openid.net/specs/openid-provider-commands-1_0.html)

## OpenID Key Binding
<span class="in-progress">April, 2025</span>

A specification that binds cryptographic keys to OpenID Connect sessions, ensuring that tokens can only be used by their intended recipients even if intercepted. With sophisticated attacks targeting token theft and replay, key binding adds a critical layer of security to authentication flows. Hellō implements key binding to strengthen our authentication mechanisms, protecting user sessions against token interception and misuse while maintaining seamless user experiences.

[Draft Spec](https://github.com/dickhardt/openid-key-binding) • [Try out the demo](https://playground.hello.dev/)

## Email Verification Protocol
<span class="in-progress">April, 2025</span>

A browser-based protocol that standardizes email verification during account creation and recovery, reducing friction while ensuring email addresses are valid and controlled by the user. Email verification is fundamental to account security, but current methods are fragmented and often create poor user experiences. Hellō uses this protocol to verify user email addresses efficiently, reducing fraudulent account creation while providing a smoother experience than traditional verification methods.

[Draft Spec](https://github.com/WICG/email-verification-protocol)

## IPSIE
<span class="in-progress">October, 2024</span>

The Identity Provider Session Initiation Extension defines standardized methods for initiating user sessions across multiple identity providers, enabling seamless single sign-on experiences. As users interact with services through various identity providers, consistent session initiation is essential for both security and user experience. Hellō's abstraction layer integrates with 30+ identity providers, and IPSIE enables us to provide consistent, secure session management across this diverse ecosystem, reducing friction for users and developers alike.

[Draft Spec](https://github.com/dickhardt/ipsie)

## OAuth 2.1
<span class="in-progress">January, 2024</span>

A consolidation of OAuth 2.0 that incorporates security best practices, removes deprecated features, and simplifies the framework to make secure implementations easier. OAuth 2.0's flexibility led to common implementation mistakes and security vulnerabilities, making a streamlined version essential. Hellō's authorization mechanisms are built on OAuth principles, and adopting OAuth 2.1 ensures our systems follow the latest security standards while maintaining compatibility with the broader ecosystem.

[Draft Spec](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10)

## JWT
<span class="completed">May, 2015</span>

JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties, enabling stateless authentication and information exchange. JWTs revolutionized web authentication by providing a standardized, self-contained token format that doesn't require server-side session storage. Hellō uses JWTs extensively in our authentication and authorization flows, enabling scalable, efficient identity verification across our abstraction layer that connects users, identity providers, and applications.

[IETF Spec](https://datatracker.ietf.org/doc/html/rfc7519)

## OAuth 2.0
<span class="completed">October, 2012</span>

The authorization framework that enables third-party applications to obtain limited access to user resources without exposing credentials, establishing the foundation for modern delegated access. OAuth 2.0 solved the critical problem of allowing users to grant applications access to their data without sharing passwords, enabling the modern API economy. Hellō's authorization mechanisms are built upon OAuth 2.0 principles, and this foundational standard enables our abstraction layer to securely connect applications with identity providers while giving users control over their data.

[IETF Spec](https://datatracker.ietf.org/doc/html/rfc6749)