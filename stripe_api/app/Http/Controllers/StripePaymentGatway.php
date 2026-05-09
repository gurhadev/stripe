<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class StripePaymentGatway extends Controller
{
    public function index(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $validator = Validator::make($request->all(), [
            "amount" => "required"
        ]);

        if ($validator->fails()) {
            return response()->json(["error" => $validator->errors()->first(),"status" => false],422);
        }
        
        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount * 100, // ₹ or $ in smallest unit
                'currency' => 'inr',
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret,
                'status' => true,
            ],200);
        } catch (\Throwable $th) {
            return response()->json(["error" => $th,"status" => false],422);
        }
    }

    public function getStripePaymentDetails(string $payment_indent_id){
        Stripe::setApiKey(config('services.stripe.secret'));

        if($payment_indent_id){
            $paymentIndent = PaymentIntent::retrieve($payment_indent_id);
            return response()->json(["data" => $paymentIndent,"status" => true],200);
        }else{
            return response()->json(["error" => "payment indent is not provide.","status" => false],422);
        }        
    }
}
