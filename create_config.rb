#!/usr/bin/ruby

IEX_CLOUD_KEY = ENV['IEX_CLOUD_KEY']
ONESIGNAL_APPID = ENV['ONESIGNAL_APPID']

open('config.js', 'w') { |output_file|
  output_file.puts "export const IEX_CLOUD_KEY = '#{IEX_CLOUD_KEY}'"
  output_file.puts "export const ONESIGNAL_APPID = '#{ONESIGNAL_APPID}'"
  # output_file.puts "export const variable3 = '#{path}'"
}
