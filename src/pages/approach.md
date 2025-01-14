---
editLink: true
---
# The Hellō Approach

Hellō provides an abstraction layer between identity providers and applications, addressing both personal (B2C) and workforce (B2B) identity challenges. By simplifying integration and enabling a holistic view of user identities, Hellō resolves key issues with both centralized and decentralized approaches to identity.

## Centralized Identity Issues

### Private Control and Misaligned Interests

*Centralized identity systems are often controlled by private organizations that prioritize their own interests over those of users and developers. This dynamic has historically led to trust issues, exemplified by [Microsoft Passport][1], which faced significant criticism and was later [scaled back][2]. Similar concerns persist with modern social login providers like Google, Facebook, and Apple, where unilateral decisions can revoke access or limit functionality, causing disruptions for both [users][3] and [developers][4].*

Hellō (the for-profit interchange operator) is governed by the [Hello Identity Co-op](cooperative), a multi-stakeholder cooperative that includes users, organizations, and employees. This distributed governance structure ensures that governance decisions are made in the best interests of all parties, not driven by private or profit-driven motives. All stakeholders have a voice in governing Hellō Operations, creating a more equitable and trustworthy identity system.

### Limited User Control

*Centralized solutions, such as Microsoft Passport and modern social login services, often place control in the hands of private entities. Users can lose access to their accounts or data if a provider chooses to revoke access.*

Hellō gives users control over their data by integrating with existing identity providers while anonymizing interactions between providers and applications. This ensures that user data is only shared with explicit consent and protects against unilateral revocation.

### Developer Lock-In

*Developers relying on centralized systems risk lock-in. Providers can change APIs, discontinue services, or revoke access, leading to costly re-engineering efforts.*

By acting as an abstraction layer, Hellō allows developers to integrate once and gain access to 30+ identity providers. This eliminates the dependency on any single provider and reduces the risk of future disruptions.

### Limited Scope

*Centralized solutions focus primarily on authentication and do not address broader identity verification needs, such as citizenship or affiliations.*

Hellō supports basic claims, like login and email verification, and in the future will support advanced claims, such as verified age and citizenship. This extensibility provides developers with more comprehensive identity capabilities.

## Decentralized Identity Issues

### Adoption Barriers

*Decentralized identity requires widespread adoption by users, issuers, and applications. Without critical mass, the ecosystem remains fragmented and underutilized.*

Hellō removes many of the cold start problems by integrating with existing credentials and technologies, enabling users and issuers to participate without adopting new systems. Applications benefit from proven standards like [OpenID Connect][5], reducing friction.

### Wallet Fragmentation

*Many digital wallets supporting decentralized identity are incompatible, creating additional complexity for users and developers.*

Hellō acts as a bridge between various wallets and applications, providing developers with a unified integration point that abstracts away incompatibility issues.

### Issuer Business Model

*Decentralized systems often prevent issuers from monetizing credentials, which discourages commercial participation.*

Hellō will provide a marketplace for verified claims, allowing issuers to sell credentials to developers. Hellō anonymizes transactions to preserve user privacy while supporting a sustainable business model for issuers.

## Workforce Identity (B2B)

### Federation Complexity

*Setting up federations with enterprise IdPs from Google, Microsoft, Okta, or Ping is time-consuming and technically complex. Developers must configure and maintain separate integrations for each enterprise customer.*

With Hellō, developers integrate once and gain access to all supported enterprise IdPs. This single integration removes the need for repetitive setup, reducing time-to-market for B2B SaaS applications to be enterprise ready.

### Management Overhead

*Maintaining federations for hundreds or thousands of enterprise customers is a significant burden.*

Hellō abstracts away the need to manage individual federations, enabling developers to focus on building and scaling their applications.

### High Costs

*Existing CIAM vendors charge premium fees for B2B functionality, making SSO inaccessible for smaller enterprises or startups.*

Hellō provides basic SSO functionality for free, allowing developers to offer SSO to enterprise customers of any size. Enhanced features, such as managed app access and de-provisioning, are available at competitive rates.

### Unified View of Identity

*B2B and B2C identity systems are often siloed, limiting their ability to provide a holistic understanding of users.*

By supporting both B2C and B2B identity, Hellō offers a unified view of users, integrating personal and workforce identities into a single, scalable solution.

## Privacy and Governance

### Data Confidentiality

*Centralized systems raise concerns about data confidentiality and potential misuse.*

Hellō will use the [Hellō Protocol](protocol.html) to ensure that only users can access and release their data. Anonymized interactions between providers and applications further protect user information.

### Surveillance Risks

*Centralized services are vulnerable to state surveillance and abuse.*

Hellō’s [Data Governance](data-governance) model requires subpoenas from two independent geopolitical jurisdictions for lawful data access. This ensures that no single entity can unilaterally demand user data.

### Secure Operations

*Ensuring the integrity and availability of a centralized service is critical.*

Hellō’s architecture is resilient to failures and designed to prevent impersonation or unauthorized access. This ensures reliable and secure operations for developers and users.

## Summary

Hellō bridges the gap between identity providers and applications, solving the challenges of both personal and workforce identity. Its single integration point simplifies developer workflows, while its privacy-first design ensures user trust. By supporting both B2C and B2B identity, Hellō provides a comprehensive and scalable solution that benefits users, developers, and enterprises alike.

----

## FAQs

#### 1) What identity providers does Hellō support?

Hellō integrates with 30+ providers, including Apple, Google, Facebook, Microsoft, and more. Users can also log in with email, phone, or crypto wallets.

#### 2) Why is Hellō’s SSO free for developers?

Hellō believes basic SSO should be accessible without financial barriers. This approach fosters adoption and builds network effects.

#### 3) How does Hellō improve user privacy?

Hellō anonymizes interactions between identity providers and applications, ensuring that neither party learns more about the user than necessary.

#### 4) How does Hellō simplify developer workflows?

Developers integrate with Hellō once and gain access to all supported providers. This eliminates the need for managing multiple APIs or credentials.

#### 5) How does Hellō help B2B SaaS developers?

Hellō provides a single integration point for enterprise identity providers, removing the need to set up and manage individual federations for each enterprise customer.

#### 6) What enterprise providers does Hellō support?

Hellō currently supports Google Workspace, Microsoft Entra ID, and Zoho, with more providers in the roadmap.

#### 7) How is Hellō different from CIAM vendors?

Unlike Auth0 or WorkOS, Hellō does not manage user pools, role-based access, or password-based authentication. Instead, it focuses on being a lightweight, cost-effective SSO abstraction layer.

#### 8) Can Hellō handle advanced workforce identity needs?

Yes. Hellō offers premium features like managed apps and de-provisioning for enterprises with mature identity management models.

#### 9) Why do enterprises prefer Hellō?

Enterprises benefit from simplified SSO setup and a cost-effective solution for managing application access.

#### 10) How does supporting both B2C and B2B give Hellō an edge?

By addressing both personal and workforce identity, Hellō offers a holistic view of user identity, enabling developers to build richer, more connected experiences.

#### 11) How does Hellō support privacy and compliance?

Hellō’s architecture ensures user data remains private and secure, while its governance model prevents misuse by state or corporate actors.

#### 12) Why will users prefer applications that use Hellō?

Hellō combines the convenience of social logins with enhanced privacy and flexibility. Users avoid vendor lock-in and benefit from a seamless experience across personal and work contexts.


[1]: <https://news.microsoft.com/1999/10/11/microsoft-passport-streamlining-commerce-and-communication-on-the-web/> "Microsoft Passport: Streamlining Commerce and Communication on the Web"
[2]: <https://www.computerworld.com/article/2567539/microsoft-scales-back-passport-plan.html> "Microsoft Scales Back Passport Plan"
[3]: <https://www.kqed.org/news/11851695/facebook-deleted-your-account-good-luck-retrieving-your-data> "Facebook Deleted Your Account? Good Luck Retrieving Your Data"
[4]: <https://www.reuters.com/article/us-apple-epic-games-idCAKBN2602YG> "Fortnite says gamers can no longer use Apple sign-in system"
[5]: <https://en.wikipedia.org/wiki/OpenID> "OpenID entry on Wikipedia"

<style>
    #faqs{
        margin-bottom: 30px !important;
    }
    h3 {
        font-family: sans-serif;
        font-weight: bold !important;
        font-style: italic !important;
        margin-top: 10px !important;
        margin-bottom: -12px !important;
        margin-left: 26px !important;
    }
    h3 ~ p {
        margin-left: 26px !important;
    }
    h4 {
        font-family: sans-serif;
        font-weight: bold !important;
        font-style: italic !important;
        margin-top: 10px !important;
        margin-bottom: -12px !important;
    }
    h4 + p {
        margin-left: 26px !important;
    }

</style>