<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EmployerController extends Controller
{
   
   public function insert_payments(Request $request){
    $empolyer_id = $request->employer_id;
    $amount = $request->amount;

    $payment = new Payment();
    $payment->employer_id = $empolyer_id ;
    $payment->amount = $amount ;
    }
   

    public function calclate_points(Request $request){
        $empolyer_id = $request->employer_id;
        $payments = Payment::where('employer_id', $empolyer_id  )->get();  
        $employer = Employer::find($empolyer_id);
        $total_points = 0;
        $stars = 'Crawler';
        $star_value = 0;
        //pOINTS
        foreach($payments as $payment){
            $paid_date = $payment->paid_date; 
            $due_date = $payment->duedate;
            $points = 0;
            
            $diff_date = $paid_date == null ? 'N/A' : Carbon::parse($due_date)->diffInDays(Carbon::parse($paid_date), false);

            if($diff_date == 'N/A'){
                
                //pass current month
                $current_month = Carbon::now()->month;
                $due_date_month = Carbon::parse($due_date)->month;
                
              if($current_month == $due_date_month){
                $points = 0;
                $total_points = $total_points + $points;
                 }else{
                    $points = -5;
                    $total_points = $total_points + $points;
                 }

                
              }

            if($diff_date < 0){
                $points = 3;
                $total_points = $total_points + $points;
            }elseif($diff_date > 0 && $diff_date <= 90){
                $points = 1;
                $total_points = $total_points + $points;
            }elseif ($diff_date > 90  ){
                $points = -5;
                $total_points = $total_points + $points;
            }

            
        }
        //sTARS 
        $payments_star = Payment::where('employer_id', $empolyer_id  )->orderBy('duedate', 'desc')->take(12)->get();  
        $paid_count  =0;
        foreach($payments_star as $star_payment){
            $starpaid_date = $star_payment->paid_date;
           
            if( $starpaid_date  != null){
                ++$paid_count;
            }
        }
        if($paid_count > 11 ){
            $stars= "Platinum";
            $star_value= 5;
        }elseif($paid_count > 5 && $paid_count <= 11){
            $stars= "Gold";
            $star_value= 4;
        }
        elseif($paid_count > 3 && $paid_count <= 5){
            $stars= "Bronze";
            $star_value = 3;
        }
        $result_array = [
            'employer_id'=>$empolyer_id,
            'employer'=>$employer,
            'total_points'=>$total_points, 
            'paid_count'=>$paid_count,
            'stars'=>$stars,
            'star_value'=>$star_value,

        ];
        return response()->json($result_array);
    }


    public function allRatings(Request $request)
    {
        $employers = Employer::all();
        $data = [];

        foreach($employers as $employer){
            $request->request->add(['employer_id' => $employer->id]);
            $dt =  $this->calclate_points($request);

            array_push($data, $dt->original);
        }


        $arranged = [];

        $key_values = array_column($data, 'star_value'); 
        array_multisort($key_values, SORT_DESC, $data);


        return $data;
    }


    //
}
