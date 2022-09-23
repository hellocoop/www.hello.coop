---
editLink: true
---

# Hellō Data Governance

## Privacy is a Human Right

We believe that privacy is a human right. We manifest this in our [Tenets](laws-of-identity.html) and our [Computing Architecture](architecture.html).

Neither Hellō, nor any of the vendors have access to any user data at rest or while being processed. As none of the parties have access to user data, an attacker breaching a system can not gain access to user data.

## Subpoena Compliance

We do not want to be a safe haven for criminals, and believe it is in society's best interest to cooperate when there is suspicion of activity that is widely recognized as a crime, such as human trafficking. 

The process for law enforcement to obtain Hellō information for a suspected criminal is to obtain a subpoena from the jurisdictions of both the Token Service and the Orchestration Service. The subpoenas contain one or more public identifiers for the suspected criminal that Hellō has for the user. The subpoenas are digitized and presented to both the Token Service and the Orchestration Service by law enforcement using the supplied application. The Token Service will generate Access Tokens that the Orchestration Service will use to read any user information associated with the public identifiers and present it to law enforcement. 

## Subpoena Access Granted

The data provided about the suspected criminal will include which applications they have used with Hellō, and any profile information they have provided Hellō. They will also learn the preferred and recovery login providers.

Law enforcement cannot impersonate the user, update their data, delete their data, nor suspend them from using Hellō.
 
Note that no Hellō or custodian employees see any of the data released in the data retrieval process. Only the authorized law enforcement representatives have access to the subpoenaed data.

## Subpoena Accountability

A public ledger is updated with the identity of the law enforcement agency that made the request and a hash of the public identifier. This provides public visibility to the frequency of access, and which entities are being granted access.

### FAQs

### 1) What if Hellō is subpoenaed to provide information about a user?
We will educate the requesting party that we do not have the technical capability to provide any information, and share the process for them to access the information.

### 2) What if Hellō's infrastructure vendor (eg AWS) is subpoenaed to exfiltrate user data from machines running one of the components?
Our understanding of infrastructure vendor functionality is that they are unable to exfiltrate data from a specific running process, and that adding that capability would have the potential to compromise any customer, and they are motivated to deny such a request and succeed. We continue to explore what options we have to ensure that user data cannot be exfiltrated, and welcome suggestions from the community.

### 3) How will Hellō operate in regimes that require access to user information?
We will not operate in those regimes. As Hellō is a global web service, anyone that can connect to Hellō servers can use Hellō, we will not change our data governance to comply with such requests and expect some regimes to block access to Hellō for their citizens.

### 4) How will you operate in China if you do not provide access to user information?
As noted in the previous question, we will not adjust our data governance. We do not see this as a missed commercial opportunity as China already has alternative digital identity mechanisms.
 

