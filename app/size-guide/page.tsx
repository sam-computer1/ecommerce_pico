import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Size Guide - Modern Footwear",
  description: "Find your perfect fit with our comprehensive size guide for men, women, and kids.",
}

export default function SizeGuidePage() {
  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Size Guide</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Find your perfect fit with our comprehensive size guide</p>

        <Tabs defaultValue="mens" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="mens">Men's Sizes</TabsTrigger>
            <TabsTrigger value="womens">Women's Sizes</TabsTrigger>
            <TabsTrigger value="kids">Kids' Sizes</TabsTrigger>
          </TabsList>

          <TabsContent value="mens" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Men's Footwear Size Chart</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border px-4 py-2 text-left">US</th>
                    <th className="border px-4 py-2 text-left">UK</th>
                    <th className="border px-4 py-2 text-left">EU</th>
                    <th className="border px-4 py-2 text-left">CM</th>
                    <th className="border px-4 py-2 text-left">Foot Length (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">7</td>
                    <td className="border px-4 py-2">6</td>
                    <td className="border px-4 py-2">40</td>
                    <td className="border px-4 py-2">25</td>
                    <td className="border px-4 py-2">9.8"</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">8</td>
                    <td className="border px-4 py-2">7</td>
                    <td className="border px-4 py-2">41</td>
                    <td className="border px-4 py-2">26</td>
                    <td className="border px-4 py-2">10.2"</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">9</td>
                    <td className="border px-4 py-2">8</td>
                    <td className="border px-4 py-2">42</td>
                    <td className="border px-4 py-2">27</td>
                    <td className="border px-4 py-2">10.6"</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">10</td>
                    <td className="border px-4 py-2">9</td>
                    <td className="border px-4 py-2">43</td>
                    <td className="border px-4 py-2">28</td>
                    <td className="border px-4 py-2">11.0"</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">11</td>
                    <td className="border px-4 py-2">10</td>
                    <td className="border px-4 py-2">44</td>
                    <td className="border px-4 py-2">29</td>
                    <td className="border px-4 py-2">11.4"</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">12</td>
                    <td className="border px-4 py-2">11</td>
                    <td className="border px-4 py-2">45</td>
                    <td className="border px-4 py-2">30</td>
                    <td className="border px-4 py-2">11.8"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-4">Men's Clothing Size Chart</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border px-4 py-2 text-left">Size</th>
                    <th className="border px-4 py-2 text-left">Chest (inches)</th>
                    <th className="border px-4 py-2 text-left">Waist (inches)</th>
                    <th className="border px-4 py-2 text-left">Hip (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">S</td>
                    <td className="border px-4 py-2">35-37</td>
                    <td className="border px-4 py-2">29-31</td>
                    <td className="border px-4 py-2">35-37</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">M</td>
                    <td className="border px-4 py-2">38-40</td>
                    <td className="border px-4 py-2">32-34</td>
                    <td className="border px-4 py-2">38-40</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">L</td>
                    <td className="border px-4 py-2">41-43</td>
                    <td className="border px-4 py-2">35-37</td>
                    <td className="border px-4 py-2">41-43</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">XL</td>
                    <td className="border px-4 py-2">44-46</td>
                    <td className="border px-4 py-2">38-40</td>
                    <td className="border px-4 py-2">44-46</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">XXL</td>
                    <td className="border px-4 py-2">47-49</td>
                    <td className="border px-4 py-2">41-43</td>
                    <td className="border px-4 py-2">47-49</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="womens" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Women's Footwear Size Chart</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border px-4 py-2 text-left">US</th>
                    <th className="border px-4 py-2 text-left">UK</th>
                    <th className="border px-4 py-2 text-left">EU</th>
                    <th className="border px-4 py-2 text-left">CM</th>
                    <th className="border px-4 py-2 text-left">Foot Length (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">5</td>
                    <td className="border px-4 py-2">3</td>
                    <td className="border px-4 py-2">35-36</td>
                    <td className="border px-4 py-2">22</td>
                    <td className="border px-4 py-2">8.7"</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">6</td>
                    <td className="border px-4 py-2">4</td>
                    <td className="border px-4 py-2">36-37</td>
                    <td className="border px-4 py-2">23</td>
                    <td className="border px-4 py-2">9.1"</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">7</td>
                    <td className="border px-4 py-2">5</td>
                    <td className="border px-4 py-2">37-38</td>
                    <td className="border px-4 py-2">24</td>
                    <td className="border px-4 py-2">9.4"</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">8</td>
                    <td className="border px-4 py-2">6</td>
                    <td className="border px-4 py-2">38-39</td>
                    <td className="border px-4 py-2">25</td>
                    <td className="border px-4 py-2">9.8"</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">9</td>
                    <td className="border px-4 py-2">7</td>
                    <td className="border px-4 py-2">39-40</td>
                    <td className="border px-4 py-2">26</td>
                    <td className="border px-4 py-2">10.2"</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">10</td>
                    <td className="border px-4 py-2">8</td>
                    <td className="border px-4 py-2">40-41</td>
                    <td className="border px-4 py-2">27</td>
                    <td className="border px-4 py-2">10.6"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-4">Women's Clothing Size Chart</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border px-4 py-2 text-left">Size</th>
                    <th className="border px-4 py-2 text-left">Bust (inches)</th>
                    <th className="border px-4 py-2 text-left">Waist (inches)</th>
                    <th className="border px-4 py-2 text-left">Hip (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">XS (0-2)</td>
                    <td className="border px-4 py-2">31-33</td>
                    <td className="border px-4 py-2">24-26</td>
                    <td className="border px-4 py-2">34-36</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">S (4-6)</td>
                    <td className="border px-4 py-2">34-36</td>
                    <td className="border px-4 py-2">27-29</td>
                    <td className="border px-4 py-2">37-39</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">M (8-10)</td>
                    <td className="border px-4 py-2">37-39</td>
                    <td className="border px-4 py-2">30-32</td>
                    <td className="border px-4 py-2">40-42</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">L (12-14)</td>
                    <td className="border px-4 py-2">40-42</td>
                    <td className="border px-4 py-2">33-35</td>
                    <td className="border px-4 py-2">43-45</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">XL (16-18)</td>
                    <td className="border px-4 py-2">43-45</td>
                    <td className="border px-4 py-2">36-38</td>
                    <td className="border px-4 py-2">46-48</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="kids" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Kids' Footwear Size Chart</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border px-4 py-2 text-left">US</th>
                    <th className="border px-4 py-2 text-left">UK</th>
                    <th className="border px-4 py-2 text-left">EU</th>
                    <th className="border px-4 py-2 text-left">CM</th>
                    <th className="border px-4 py-2 text-left">Age (approx.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">10C</td>
                    <td className="border px-4 py-2">9</td>
                    <td className="border px-4 py-2">27</td>
                    <td className="border px-4 py-2">16.5</td>
                    <td className="border px-4 py-2">4-5 years</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">11C</td>
                    <td className="border px-4 py-2">10</td>
                    <td className="border px-4 py-2">28</td>
                    <td className="border px-4 py-2">17.1</td>
                    <td className="border px-4 py-2">5-6 years</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">12C</td>
                    <td className="border px-4 py-2">11</td>
                    <td className="border px-4 py-2">30</td>
                    <td className="border px-4 py-2">18.1</td>
                    <td className="border px-4 py-2">6-7 years</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">13C</td>
                    <td className="border px-4 py-2">12</td>
                    <td className="border px-4 py-2">31</td>
                    <td className="border px-4 py-2">19.1</td>
                    <td className="border px-4 py-2">7-8 years</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">1Y</td>
                    <td className="border px-4 py-2">13</td>
                    <td className="border px-4 py-2">32</td>
                    <td className="border px-4 py-2">20.0</td>
                    <td className="border px-4 py-2">8-9 years</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">2Y</td>
                    <td className="border px-4 py-2">1</td>
                    <td className="border px-4 py-2">33</td>
                    <td className="border px-4 py-2">20.8</td>
                    <td className="border px-4 py-2">9-10 years</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-4">Kids' Clothing Size Chart</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border px-4 py-2 text-left">Size</th>
                    <th className="border px-4 py-2 text-left">Height (inches)</th>
                    <th className="border px-4 py-2 text-left">Weight (lbs)</th>
                    <th className="border px-4 py-2 text-left">Age (approx.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">4T</td>
                    <td className="border px-4 py-2">39-41</td>
                    <td className="border px-4 py-2">35-39</td>
                    <td className="border px-4 py-2">4 years</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">5T</td>
                    <td className="border px-4 py-2">42-44</td>
                    <td className="border px-4 py-2">40-44</td>
                    <td className="border px-4 py-2">5 years</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">6</td>
                    <td className="border px-4 py-2">45-47</td>
                    <td className="border px-4 py-2">45-49</td>
                    <td className="border px-4 py-2">6 years</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border px-4 py-2">7</td>
                    <td className="border px-4 py-2">48-50</td>
                    <td className="border px-4 py-2">50-54</td>
                    <td className="border px-4 py-2">7 years</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">8</td>
                    <td className="border px-4 py-2">51-53</td>
                    <td className="border px-4 py-2">55-64</td>
                    <td className="border px-4 py-2">8 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">How to Measure</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-2">Foot Measurement</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Place a piece of paper on a hard floor against a wall.</li>
                <li>Stand on the paper with your heel against the wall.</li>
                <li>Mark the longest part of your foot on the paper.</li>
                <li>Measure the distance from the wall to the mark in centimeters or inches.</li>
                <li>Use our size chart to find your perfect fit.</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Clothing Measurement</h3>
              <ul className="space-y-2">
                <li>
                  <strong>Chest/Bust:</strong> Measure around the fullest part of your chest/bust.
                </li>
                <li>
                  <strong>Waist:</strong> Measure around your natural waistline.
                </li>
                <li>
                  <strong>Hip:</strong> Measure around the fullest part of your hips.
                </li>
                <li>
                  <strong>Inseam:</strong> Measure from the crotch to the bottom of the leg.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-2">Tips for Finding the Right Fit</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>If you're between sizes, we recommend going up a size.</li>
              <li>
                Feet tend to swell throughout the day, so it's best to measure your feet in the afternoon or evening.
              </li>
              <li>If one foot is larger than the other, fit to the larger foot.</li>
              <li>Consider the socks you'll be wearing with your shoes when measuring.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Still have questions about sizing?</p>
          <Button asChild>
            <Link href="/contact">Contact Our Support Team</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

