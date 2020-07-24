#!/usr/bin/ruby

IEX_CLOUD_KEY = ENV['IEX_CLOUD_KEY']
ONESIGNAL_APPID = ENV['ONESIGNAL_APPID']
IAPHUB_API_KEY = ENV['IAPHUB_API_KEY']
IAPHUB_APPID = ENV['IAPHUB_APPID']
IEX_URL = ENV['IEX_URL']
IAPHUB_ENV = ENV['IAPHUB_ENV']
APPSTORE_APP_SECRET = ENV['STOCKET_APPSTORE_APP_SECRET']

open('../config.js', 'w') { |output_file|
  output_file.puts "export const IEX_CLOUD_KEY = '#{IEX_CLOUD_KEY}'"
  puts "created IEX_CLOUD_KEY #{IEX_CLOUD_KEY}"
  output_file.puts "export const IAPHUB_API_KEY = '#{IAPHUB_API_KEY}'"
  puts "created IAPHUB_API_KEY #{IAPHUB_API_KEY}"
  output_file.puts "export const IAPHUB_APPID = '#{IAPHUB_APPID}'"
  puts "created IAPHUB_APPID #{IAPHUB_APPID}"
  output_file.puts "export const IEX_URL = '#{IEX_URL}'"
  puts "created IEX_URL #{IEX_URL}"
  output_file.puts "export const IAPHUB_ENV = '#{IAPHUB_ENV}'"
  puts "created IAPHUB_ENV #{IAPHUB_ENV}"
  output_file.puts "export const APPSTORE_APP_SECRET = '#{APPSTORE_APP_SECRET}'"
  puts "created APPSTORE_APP_SECRET #{APPSTORE_APP_SECRET}"
  # output_file.puts "export const variable3 = '#{path}'"
}
