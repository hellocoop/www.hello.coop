---
editLink: true
---

# The Hellō Computing Architecture

## Goals

It is a requirement that trusting the confidentiality, integrity, and availability of the Hellō service does not require trusting the Hellō cooperative or its vendors. 

>Currently, the Hellō service is a monolithic architecture operated directly by the cooperative. Once we have product market fit, we will migrate to the following computing architecture. 

## Separation of Concerns

The Hellō service is composed of four independent components which each perform a different function. Access to user data requires the components to cooperate. No component can independently access user data. For details, see the [Hellō Protocol](protocol)

The separation of concerns continues with the control of each component. The Hellō cooperative delegates control of each component to independent custodians. The custodian controls the administrative access and cryptographic keys for a component. Each custodian operates in an independent geopolitical jurisdiction. This prevents a single jurisdiction from compelling more than one component to divulge their cryptographic keys, which could give the jurisdiction access to user data. [Data Governance](data-governance)

## Redundant Independent Verification

The custodians and the cooperative independently verifying the infrastructure. The software for all components is in public repositories. All the parties clone the repository and build each component and calculate the image checksums. Each custodian, and the cooperative, can read the checksum of all deployed component images to verify the images running are built from the publicly visible source code. The infrastructure configuration is readable to all parties, and all infrastructure modifications and metrics are published to all parties.

## Independent Components

The custodians are vendors of the cooperative and are compensated for their service, which is an operating expense for the cooperative. The custodians are chosen for the independence and proven track record operating security infrastructure. If a custodian deviates from their agreement, the cooperative can replace them for breaching their contract and replacing them with a custodian on standby.

## Independent Components

The four components of the Hellō Computing Architecture are:
1. The Orchestration Service interacts with external systems and contains all the business logic. 
1. The Token Service verifies requests and tokens from the Orchestration Service and mints ID Tokens, Records, Access Tokens, and Session Tokens.
1. The Encryption Service encrypts and decrypts records going to and from the Orchestration Service and the Storage Service.
1. The Storage Service Creates, Reads, Updates, and Deletes records in an external database per Access Tokens presented to it.

## Overview

In the following diagram, we show the relationship between all the parties. The application (example.app) and issuer (op.example) interact with the Hellō Service. The Orchestration Service is the only component that interacts with external systems. It interacts with the Token Service, and then the Encryption Service, which interacts with the Storage Service, which interacts with the external database. Independent custodians control the credentials for each of the components.

<picture>
  <source srcset="./assets/dark-mode-computing-architecture.svg" media="(prefers-color-scheme: dark)">
  <img src="./assets/light-mode-computing-architecture.svg">
</picture>


For details on how the components interact with each other, see the [Hellō Protocol](protocol)

## Confidentiality

Neither the cooperative, nor any custodian is able to arbitrarily access user information using the credentials they possess. The risk of exfiltrating user data while being processed is minimized by having redundant verification of the software being executed in each component. 

## Integrity

All changes to the users data require cooperation between the Orchestration Service and the Token Service. Any externally verified claims about a user are independently verified by the Orchestration Service and the Token Service. 

## Availability

Deploying the Hellō service in multiple geographic regions and replicating the database across the same regions provides resilience as long as one region is still available.