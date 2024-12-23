use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    let filename = "input.txt";
    let file = File::open(filename).expect("File not found");
    let reader = BufReader::new(file);

    let mut lines = reader.lines();
    let mut left_list: Vec<u32> = Vec::with_capacity(1000);
    let mut right_list: Vec<u32> = Vec::with_capacity(1000);
    let mut result = 0u32;

    while let Some(line) = lines.next() {
        let line = line.unwrap();
        let parts = line.split("  ").collect::<Vec<&str>>();
        let left = parts[0].parse::<u32>().unwrap();
        let right = parts[1].trim().parse::<u32>().unwrap();
        left_list.push(left);
        right_list.push(right);
    }

    left_list.sort();
    right_list.sort();

    for i in 0..left_list.len() {
        let delta = left_list[i].abs_diff(right_list[i]);
        result += delta;
    }

    println!("{}", result);
}