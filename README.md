# Stocket [![Build status](https://build.appcenter.ms/v0.1/apps/9e7573bf-a8b0-4635-a329-01500031effe/branches/master/badge)](https://appcenter.ms)

Stock simulation app.

## Environment variables setup
To be able to run the app you'll need keys for IEX Cloud, IapHub, and a secret from the app store. To get the `config.js` file create a shell script that will run every time you build the app and ensure that you are using the correct variables for each scheme

**1.** Create the following shell scripts `prod-env.sh`, `staging-env.sh`, `dev-env.sh`. Example of file content:

```
echo "Setting Production Environment Variables started"

export IEX_CLOUD_KEY=IEX CLOUD PRODUCTION KEY
export IEX_URL=https://cloud.iexapis.com/v1
export IAPHUB_ENV=production
export STOCKET_APPSTORE_APP_SECRET=APP STORE APP SPECIFIC SECRET

ruby ../create_config.rb
echo "Setting Environment Variables finished"
```

**2.** After creating the variables add a `run script` in Xcode build phases and move it to the top.