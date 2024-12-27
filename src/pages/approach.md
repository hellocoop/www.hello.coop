---
editLink: true
---

# The Hellō Approach

Hellō is an interchange between sources of identity and the consuming application using existing protocols and technology. 

## Early Centralized Identity Approaches

Internet identity is a complicated and unsolved problem. Early centralized offerings, such as [Microsoft Passport][1], were [rejected][2] for fear of giving control to privately-owned entities. Recent centralized offerings – such as Apple, Facebook, and Google’s social login services – only solve a fraction of the problem and access to these free services can be revoked from the [user][3] or the [developer][4] at any time.

## Decentralized Identity Approach

To resolve the concerns with a centralized approach, numerous decentralized identity approaches have been proposed and built. In the [decentralized approach](https://www.microsoft.com/en-us/security/business/solutions/decentralized-identity) an issuer provides a credential to a user, and then the user chooses to provide the credential to an application. For example, a school will issue a credential to a student so they can prove they are a student. This puts the user in the middle of the transaction, giving them control of when and where their information is shared. 

## The Cold Start Problem with Decentralized Identity

However, all three parties (issuer, user, application) must be using the same, new decentralized technology, but unfortunately none are today. This is a three-way cold start barrier that has yet to be broken. There is no value to one party adopting the technology unless the other parties they are interacting with have also adopted it.

While there are a number of digital wallets that are being adopted by users to hold government issued credentials, most wallets are incompatible with each other. We view this as as adoption friction that Hellō can solve as an abstraction layer between all the different wallets, and the developer. 

## Issuer Business Model

A challenge the decentralized identity movement has not adequately addressed is the business model for commercial issuers such as credit rating agencies or background checking services. In the decentralized architecture, to preserve the user's privacy, the issuer has no relationship with the application, preventing the issuer from selling credentials to the application developer. 

## Decentralized Governance

Rather than using decentralized technology to address the concerns of a centralized service, our approach is to decentralize the governance of a centralized service with a multi-stakeholder cooperative that has representation from users, organizations, and employees. See [Hellō Cooperative](cooperative) for details.

## Resolving the Cold Start Problem

The Hellō service provides an abstraction layer between the parties, allowing users and issuers to utilize existing credentials. This removes the cold start problem for those two parties so only applications need to explicitly adopt the solution, which uses existing, proven technology ([OpenID Connect][5]) that is readily available.

Developers of new, greenfield applications that choose to use Hellō will save weeks of development time, while offering their users all the choices they have come to expect – and without the risk of a provider revoking access. 

Unlike competitive CIAM offerings, the free tier of Hellō offers developers unlimited monthly active users to encourage adoption and build up the network as every user of a Hellō app, is a Hellō user that can reuse their Hellō identity.

## Freemium Business Model

Hellō is in the verified claims business. Free claims include login, verified email, and self declared claims such as name, nickname, and picture. In the future, Hellō will offer premium verified claims such as verified name, age, citizenship, residency, affiliations, and entitlements. 

In time, Hellō will be a marketplace for paid claims sold by commercial issuers. Developers will pay the interchange fee plus the price charged by the issuer, providing a business model for commercial claims issuers. We expect this to turn some claims into commodities, lowering the pricing and increasing the utilization by developers. As Hellō sits between the issuer and the application, neither party needs to know the identity of the other, significantly improving user privacy. 

We expect in time Hellō will be bundled with other services the developer is purchasing, and the business relationship will be with the distributor, rather than the developer.

## Centralized Identity Risk Mitigation

A centralized service raises concerns of confidentiality, integrity, and availability. These are addressed with a verified confidential cooperative computing architecture that ensures only the user can access and release their data, the user can not be impersonated, and the service is resilient to multiple failures. See [Hellō Computing Architecture](architecture) for details.

While our data governance model prevents surveillance by state actors, we do not want to be a safe haven for criminals. In the case of suspected criminal activity, law enforcement must obtain subpoenas from two independent geopolitical jurisdictions to ensure the suspected activity is widely considered to be criminal, and no single jurisdiction can abuse access. See [Hellō Data Governance](data-governance) for details.

## FAQs
### 1) Why will users adopt Hellō?
Initially, we do not expect users to directly adopt Hellō. Users will instead choose to use an application that uses Hellō and implicitly create a Hellō wallet when they sign up.
### 2) Why will users prefer applications that use Hellō?
Hellō is as convenient for users as social logins but without the privacy concerns or vendor lock-in. They will not need to create another password or re-verify their email or phone.  
### 3) Why will credential issuers adopt Hellō?
Issuers do not need to choose to use Hellō, although they may choose to not allow Hellō to use them. Hellō will integrate all popular issuers using their existing APIs. In the future, Hellō will be a marketplace for commercial issuers to sell their credentials to Hellō developers.
### 4) What issuers does Hellō support?
Currently Hellō supports Apple, Facebook, Google, Microsoft, LINE, Twitch, and Yahoo. Users can also use their email, phone, or crypto wallet to log in to Hellō.
### 5) Why will developers adopt Hellō?
Developers of greenfield applications will save weeks of development time while providing their users with the login and account management choices they have come to expect. See [hello.dev](https://www.hello.dev) for more details.
### 6) How does Hellō save a developer weeks of time?
The developer no longer needs to implement account recovery, email or phone verification, or profile picture upload. Developers no longer need to spend hours registering their apps at the management consoles of social providers such as Apple, Facebook, or Google, and then copying and pasting configuration to and from those consoles.
Hellō provides a fully-featured [OpenID Connect](https://openid.net/connect/) interface that will work with the libraries and integrations developers are already familiar with. See our [developer portal](https://www.hello.dev) for details.

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
    }
    h3 + p {
        margin-left: 26px !important;
    }
</style>