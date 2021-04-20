---
title: Troubleshooting
template: article.html
---

The samples listed in this repository were built by the community over the years. During that time, the Power Platform has continually evolved.

Due to this, you may frequently experience some issues with samples that were built using an older version of the Power Platform.

We understand it can get frustrating to get some of these samples working, and we definitely want to make this process easier.

If you're experiencing issues with the samples, these tips may help you.

If you still can't get the samples to work after following these steps, feel free to [open an issue](#open-an-issue).

## Check the README.md

Every sample comes with an associated `README.md` file, which gives you detailed instructions on how to get started.

### Compatibility 

We've tried to make every sample easy to install by providing a package or solution for each. 

In some cases, we also provide the source code for each package which is designed to be used with the [https://github.com/microsoft/PowerApps-Language-Tooling](Power Apps Source File Pack and Unpack Utility).

At the time of this writing, the source code produced by older versions of the File Pack and Unpack Utility may not be compatible with newer versions.

To help identify which version of the utility was used to unpack the source code, look for a section called **Compatibility**; it will tell you which version of the utility was used to produce the source code.

For example, you may use version **0.2.3** of the utility, which uses a schema number of **0.20**. Samples marked with the following tag: ![Power Apps Source File Pack and Unpack Utility 0.20](https://img.shields.io/badge/PSAopa-0.20-green.svg) will be compatible with your version of the utility -- while  samples generated with an older version may not:

![Power Apps Source File Pack and Unpack Utility 0.19](https://img.shields.io/badge/PSAopa-0.19-green.svg)


### Minimal Path to Awesome

For the majority of samples, you can get started by downloading the package and installing it as you would any other Power Platform solution.

However, some samples require more detailed steps before you can get started.

Make sure to read the **Minimal Path to Awesome** section of the **README.md** file associated with each sample to make sure that you follow all the required steps.

## Open an issue

If -- after ensuring that you are using a compatible version of the source code tool and that you followed the required steps for the sample -- you still have difficulties using the sample, in that sample's repository.

To ensure that we can help you, make sure that you fill the issue template that is provided. We'll automatically reject issues that do not use the issue template.

Keep in mind that the samples repository is maintained by members of the community who volunteer their time to help. Please be courteous and respectful, no matter how frustrated you may be!

<img src="https://telemetry.sharepointpnp.com/powerplatform-samples/docs/troubleshooting" />