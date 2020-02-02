#!/usr/bin/ruby

WTD_API_KEY = ENV['WTD_API_KEY']
ONESIGNAL_APPID = ENV['ONESIGNAL_APPID']

open('config.js', 'w') { |output_file|
  output_file.puts "export const WTD_API_KEY = '#{WTD_API_KEY}'"
  output_file.puts "export const ONESIGNAL_APPID = '#{ONESIGNAL_APPID}'"
  # output_file.puts "export const variable3 = '#{path}'"
}
