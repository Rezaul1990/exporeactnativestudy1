export interface combinedData {
  MemberCount: number;
  CoachCount: number;
  Subscribed: boolean;
  SevenDaysClasses: SevenDaysClass[];
}
export interface ClassBookingOption {
    ClassBookingOption: string;
    DisplayValue: string;
    AdditionalInformation: string;
    Enabled: boolean;
    Cost: number;
  }
  
  export interface SevenDaysClass {
    ClassTypeID: number;
    ClassName: string;
    // ✍️ (Add important fields only jeta dorkar, naile full copy koro)
    ClubID: number;
    VenueID: number;
    ClassDate: string;
    FirstName: string;
    LastName: string;
    BookingOptions: ClassBookingOption[];
    // ✍️ Important fields only
  }