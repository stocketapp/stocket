#!/usr/bin/ruby

WTD_API_KEY = ENV['WTD_API_KEY']

open('config.js', 'w') { |output_file|
  output_file.puts "export const WTD_API_KEY = '#{WTD_API_KEY}'"
  # output_file.puts "export const variable2 = '#{path}'"
  # output_file.puts "export const variable3 = '#{path}'"
}
