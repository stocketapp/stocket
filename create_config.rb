#!/usr/bin/ruby

IEX_CLOUD_KEY = ENV['IEX_CLOUD_KEY']
IEX_CLOUD_URL = ENV['IEX_CLOUD_URL']

IAPHUB_STOCKET_API_KEY = ENV['IAPHUB_STOCKET_API_KEY']
IAPHUB_STOCKET_APP_ID = ENV['IAPHUB_STOCKET_APP_ID']
IAPHUB_ENV = ENV['IAPHUB_ENV']

STOCKET_API_URL=ENV['STOCKET_API_URL']
ONESIGNAL_APPID = ENV['ONESIGNAL_APPID']
STOCKET_APPSTORE_APP_SECRET = ENV['STOCKET_APPSTORE_APP_SECRET']

open("./config.js", 'w') { |output_file|
  output_file.puts "export const IEX_CLOUD_KEY = '#{IEX_CLOUD_KEY}'"
  puts "\nAdded IEX_CLOUD_KEY"
  output_file.puts "export const IAPHUB_STOCKET_API_KEY = '#{IAPHUB_STOCKET_API_KEY}'"
  puts "Added IAPHUB_STOCKET_API_KEY"
  output_file.puts "export const IAPHUB_STOCKET_APP_ID = '#{IAPHUB_STOCKET_APP_ID}'"
  puts "Added IAPHUB_STOCKET_APP_ID"
  output_file.puts "export const IEX_CLOUD_URL = '#{IEX_CLOUD_URL}'"
  puts "Added IEX_CLOUD_URL"
  output_file.puts "export const IAPHUB_ENV = '#{IAPHUB_ENV}'"
  puts "Added IAPHUB_ENV"
  output_file.puts "export const STOCKET_APPSTORE_APP_SECRET = '#{STOCKET_APPSTORE_APP_SECRET}'"
  puts "Added STOCKET_APPSTORE_APP_SECRET"
  output_file.puts "export const STOCKET_API_URL = '#{STOCKET_API_URL}'"
  puts "Added STOCKET_API_URL"
}
