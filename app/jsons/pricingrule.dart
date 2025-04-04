now i am gonna give you json of my tour architecture want to apply on this but currently i am not much sure about which rules should i apply i want to make it like make diffrent rules and apply on them 


{
  "status": 1,
  "tour": {
    "id": 59,
    "title": "Tour test 1",
    "slug": "tour-test-1",
    "description": "<p>Test Test</p>",
    "keywords": "Test",
    "duration": null,
    "price": 90,
    "driver_id": null,
    "short_description": "Test Test",
    "resource_type": "2",
    "deleted_at": null,
    "states_id": null,
    "city_id": 2,
    "category_id": 1,
    "featured_image": null,
    "sub_category_id": 16,
    "sort_order": 200,
    "sku": null,
    "no_of_days": null,
    "no_of_nights": null,
    "min_pax": null,
    "max_pax": null,
    "tour_images": [
      {
        "id": 247,
        "tour_id": 59,
        "image_url": "uploads/tours/2_67ae117434672.png",
        "is_feature": 0,
        "media_type": "1",
        "alt_text": null
      }
    ],
    "itineraries": [],
    "packages": [
      {
        "id": 13,
        "tour_id": 59,
        "title": "Khorfakkan Tour Private",
        "is_default": 1,
        "inclusions": null,
        "description": "<p>Khorfakkan Tour Private</p>",
        "transport_option": 1,
        "is_package_selected": null,
        "with_private_transport": 0,
        "max_capacity": 51,
        "vehicles": [
          {
            "id": 43,
            "min_pax": 35,
            "max_pax": 51,
            "category_id": 5,
            "title": "50 Seater Bus",
            "price": 1400
          },
          {
            "id": 44,
            "min_pax": 30,
            "max_pax": 37,
            "category_id": 5,
            "title": "39 Seater Bus",
            "price": 1200
          },
          {
            "id": 45,
            "min_pax": 21,
            "max_pax": 33,
            "category_id": 5,
            "title": "35 Seater Bus",
            "price": 1000
          },
          {
            "id": 46,
            "min_pax": 12,
            "max_pax": 20,
            "category_id": 5,
            "title": "22 Seater Coaster Bus",
            "price": 900
          },
          {
            "id": 47,
            "min_pax": 7,
            "max_pax": 12,
            "category_id": 5,
            "title": "14 Seater Van",
            "price": 700
          },
          {
            "id": 48,
            "min_pax": 7,
            "max_pax": 12,
            "category_id": 5,
            "title": "12 Seater Van",
            "price": 700
          },
          {
            "id": 49,
            "min_pax": 1,
            "max_pax": 6,
            "category_id": 5,
            "title": "7 Seater Car",
            "price": 600
          }
        ],
        "time_slots": [
          {
            "id": 9,
            "package_id": 13,
            "start_time": "08:00",
            "end_time": "20:00",
            "time": "08:00-20:00",
            "is_timeslot_selected": 1,
            "is_prime": 1,
            "max_capacity": 20,
            "package_pricings": [
              {
                "id": 18,
                "timeslot_id": 9,
                "pax_type_id": 1,
                "label": null,
                "supplier_id": null,
                "base_price": "0.00",
                "discount": "0.00",
                "discounted_price": "0.00"
              }
            ]
          }
        ]
      },
      {
        "id": 15,
        "tour_id": 59,
        "title": "Khorfakkan sharing tour",
        "is_default": 2,
        "inclusions": null,
        "description": "<p>Khorfakkan sharing tour</p>",
        "transport_option": 2,
        "is_package_selected": null,
        "with_private_transport": 0,
        "max_capacity": 40,
        "time_slots": [
          {
            "id": 11,
            "package_id": 15,
            "start_time": "08:00",
            "end_time": "19:00",
            "time": "08:00-19:00",
            "is_timeslot_selected": 2,
            "is_prime": 1,
            "max_capacity": 40,
            "package_pricings": [
              {
                "id": 21,
                "timeslot_id": 11,
                "pax_type_id": 1,
                "label": null,
                "supplier_id": null,
                "base_price": "120.00",
                "discount": "0.00",
                "discounted_price": "120.00"
              }
            ]
          }
        ]
      }
    ]
  }
}




look pricing is in time_slots -> package_pricings 
// and transport option is in packages -> transport_option
// and vehicles are in packages -> vehicles
// and time_slots is in packages -> time_slots
// and package_pricings is in time_slots -> package_pricings
// and package_pricings has base_price and discounted_price
// and time_slots has is_prime
// and packages has max_capacity
1 let me explain you my architecture I have tours each tour has packages and each package has time slots and each time slot has package pricings 
2 each package has transport option if transport_option is 1 it's private transport  if it's 2 it's sharing transport 
3 if trnaport option is 1 then we have vehicles and each vehicle has min pax and max pax in this scenario only charge s for the vehicle price and keep empty package pricings  in this case for some tour we may reduce price like i have a mandir private tour on weekends only that price want to reduce that's price  
4 if transport option is 2 then we have to charge for each pax and the price is in package_pricings
5 if transport option is 1 and package_pricings also has pricing then we have to charge for the vehicle price and also charge for each pax this means it is  attraction ticket with transport 
6 if time slot is_prime =1 it's price higher  



above i have given you the architecture and the rules i want to apply on this
so how i make rule engine for my architecture my backend is in laravel and frontend is in next js but now want to focus on backend 