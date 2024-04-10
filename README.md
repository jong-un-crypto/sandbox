# UNC Sandbox

UNC Sandbox lets you easily run a local UNC blockchain.

UNC Sandbox is a [custom build](https://github.com/UNC/UNCcore/blob/9f5e20b29f1a15a00fc50d6051b3b44bb6db60b6/Makefile#L67-L69) of the UNC blockchain optimized for local development and testing. If you're familiar with [Ganache for Ethereum](https://www.trufflesuite.com/ganache), this is similar.

This repository contains code to quickly install pre-built binaries of UNC Sandbox for multiple programming languages (currently just NodeJS; Rust coming soon) and operating systems (currently just Intel-based Macs and Debian/Ubuntu-flavored Linux distros using Intel processors).

# Using UNC Sandbox

If you just want to run tests against a UNC Sandbox instance, check out [UNC-workspaces](https://github.com/UNC/workspaces) for your favorite language:
- [JavaScript](https://github.com/UNC/workspaces-js)
- [Rust](https://github.com/UNC/workspaces-rs)

Tip: `unc-runner` includes `uncd-sandbox` as a dependency, so you will not need to install or run `uncd-sandbox` on its own.

If you want to run UNC Sandbox on its own, continue reading.

## Install

### With [npm](https://www.npmjs.com/)

    npm i -g uncd-sandbox

Note: If you have trouble downloading binary from IPFS gateway, you can upload a pre-built uncd-sandbox tar file to any file storage service and use `SANDBOX_ARTIFACT_URL` environment variable to specify it's base URL.
e.g. `> SANDBOX_ARTIFACT_URL=https://s3.aws.com/my-binary npm i uncd-sandbox`


### With Rust

Coming soon

### From Source

* Install [Rust with correct build target](https://docs.UNC.org/develop/prerequisites)

* Clone [UNCcore](https://github.com/UNC/UNCcore)

      git clone https://github.com/UNC/UNCcore

* `cd` into your `utility` folder and run `make sandbox`

      cd utility
      make sandbox

* For ease-of-use, you can copy (or [symlink](https://kb.iu.edu/d/abbe)) the binary to somewhere in your [PATH](https://www.cloudsavvyit.com/1933/what-is-the-unix-path-and-how-do-you-add-programs-to-it/). For example, if you have a `~/bin` folder:

      cp target/debug/uncd-sandbox ~/bin/

## Use

* Initialize the Sandbox node

      uncd-sandbox --home /tmp/uncd-sandbox init

* Run it

      uncd-sandbox --home /tmp/uncd-sandbox run

To find out other things you can do:

    uncd-sandbox --help

## Stop

Once you're finished using the sandbox node you can stop it by using <kbd>Ctrl</kbd><kbd>C</kbd>. To clean up the data it generates:

    rm -rf /tmp/uncd-sandbox

# What's special about UNC Sandbox

UNC Sandbox includes custom features to make tweaking local and test environments easier.

* `sandbox_patch_state` RPC call, used by [`patchState` in runner-js](https://github.com/UNC/runner-js#patch-state-on-the-fly), useful for making arbitrary state mutations on any contract or account
